const TOKEN = Deno.env.get("TOKEN");

const tunnelUrl = prompt("Enter tunnel URL:");

const url = `${tunnelUrl}/${TOKEN}`;

const req = await fetch(`https://api.telegram.org/bot${TOKEN}/setWebhook`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ url }),
});

console.log(await req.json());
