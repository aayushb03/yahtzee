## Steps to use local mysql DB instead of ssh tunnel
1. Make sure you have mysql installed

2. In the terminal, start the mysql server and enter your password

```
mysql -u root -p
```

3. This will open mysql on the terminal. Run this command to see what port it is running on (default is 3306)

```
SHOW VARIABLES LIKE 'port';
```

4. Create the yahtzee database, if you haven't already done that

```
CREATE DATABASE yahtzee;
```

5. In your .env file, add the database url:

```
DATABASE_URL_LOCAL=mysql://root:<password>@localhost:<port>/yahtzee
```

6. Go to the file prisma/schema.prisma, and switch the url line from "DATABASE_URL" to "DATABASE_URL_LOCAL" (do not commit this change)

```
url      = env("DATABASE_URL_LOCAL")
```

7. Automatically update the database with this command in the terminal from the project root (this command makes sure the database matches the prisma schema, but deletes all data)

```
npx prisma migrate dev
```

8. Run npm install just in case

```
npm install
```


