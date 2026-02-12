import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  console.log("--- Push Function Triggered ---");
  try {
    const payload = await req.json();
    const { record, table, type } = payload;
    console.log(`Event: ${type} on Table: ${table}`);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // --- CASE A: NEW SALE (NOTIFY MANAGERS) ---
    if (table === 'sales' && type === 'INSERT') {
      const { data: staff } = await supabase.from("users").select("full_name").eq("id", record.staff_id).single();
      const { data: managers } = await supabase.from("users").select("id, expo_push_token").in("role", ["admin", "manager"]);

      if (managers && managers.length > 0) {
        const title = "💰 New Sale Made!";
        const message = `${staff?.full_name || "Staff"} just sold a ${record.product_name} for $${record.amount}.`;

        // Save to DB for the managers' notification list
        await supabase.from("notifications").insert(
          managers.map(m => ({ user_id: m.id, title, message, type: "payment" }))
        );

        // Send Push to managers
        const pushMessages = managers.filter(m => m.expo_push_token).map(m => ({
          to: m.expo_push_token,
          title,
          body: message,
          sound: "default",
          data: { screen: "Sales" }
        }));

        if (pushMessages.length > 0) {
          await fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pushMessages),
          });
        }
      }
      return new Response("Managers Notified", { status: 200 });
    }

    // --- CASE B: GENERAL NOTIFICATION (YOUR ORIGINAL LOGIC) ---
    if (table === 'notifications' && type === 'INSERT') {
      const { data: user } = await supabase.from("users").select("expo_push_token").eq("id", record.user_id).single();

      if (user?.expo_push_token) {
        await fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: user.expo_push_token,
            title: record.title || "RecruitAI Update",
            body: record.message,
            sound: "default",
            priority: "high",
            data: {
              type: record.type,
              screen: record.type === "subscription_alert" ? "Subscription" : "Notifications",
            },
          }),
        });
        return new Response("Push Sent", { status: 200 });
      }
      return new Response("No token found", { status: 200 });
    }

    return new Response("No action taken", { status: 200 });
  } catch (err) {
    console.error("Error:", err.message);
    return new Response(err.message, { status: 500 });
  }
});