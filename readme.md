##Welocome to my wiki app!

---

__Clone the repo__

---

Before running the application you will need to:  

---

Create a __*Stripe*__ account: 

https://stripe.com/

You will need to use your test API keys in the app:

https://dashboard.stripe.com/test/apikeys

---

Create a __*SendGrid*__ account:

https://app.sendgrid.com

You will need to create and use an API key in the app:

https://app.sendgrid.com/settings/api_keys

---

create a `.env` file in the root-directory of the app:

`$ touch .env`

Add secrets to that file:


`cookieSecret="something you want here (nothing specific needed)"`  
`stripeTestKey="your test key goes here"`  
`stripeSecretKey="your secret key goes here"`  
`SENDGRID_API_KEY="your API key goes here"`  

---

Bootstrap the database:

1. Install [postgreSQL Homebrew(mac/linux)](https://wiki.postgresql.org/wiki/Homebrew)  
[postgreSQL interactive installer(windows)](https://www.postgresql.org/download/windows/)

2. Create the database: `$ createdb -U postgres -w sendipedia-dev`

3. Run the migrations: `$ sequelize db:migrate`

---

__To run app:__

navigate to home directory and run command:

- `$ npm start`

---
