# Yummers! : A Recipe Sharing Site
Yummers! is a place where professional cooks, home-cooks, aspiring cooks and alike can share their own recipes and interact with one another. Guest users can have a view of all the recipes and share the recipes in the website only. Similarly, registered users can do them as well but, there are a lot more that they can do, like comment, like, and share recipes, create their own recipes, follow other users, and can add other users' recipes to their cookbook.

## Getting Started
Clone or download the repository found at [Yummers! repository](https://github.com/unisse-courses/s15-mp12.git) to your local machine

### Prerequisites
* [Node.js v12.16.0](https://nodejs.org/en/)
* [MongoDB Community Server ](https://www.mongodb.com/download-center/community)
> Install MongoDB Compass Community as well when asked during installation

**node.js dependencies**
* express 4.17.1
* express-handlebars 3.1.0
* express-session
* connect-flash
* connect-mongo
* body-parser 1.19.0
* handlebars 4.7.3
* mongodb 3.5.5
* validator 13.0.0
* [nodemon](https://www.npmjs.com/package/nodemon) 2.0.3
* bcrypt 4.0.1


### Installing
1. Navigate to the local folder in your machine. Either by using the windows explorer and adding **cmd** to the start of the directory, or using the **dir** command in the terminal until you reach the yummers folder.
2. After navigating inside the yummers folder, install all dependencies by typing
`npm install`
3. run the project by typing `npm start` to **automatically** create the database and collections in mongodb. Console **should** output:
> recipes collection created!
> Users collection created!
> cookbook collection created!

4. Open MongoDB Compass Community. After loading, click **connect** to connect to the **default** localhost port.
> localhost:27017
5. **yummersdb** should be in the list of databases. Click on it to see the collections. There should be **3 collections** inside the database:
	1. cookbooks
	2. recipes
	3. users
6.  Open **cookbooks collection**. Click add data then import file. Select **JSON** then browse to **yummers/data/cookbooks.json**. Press import to add the data.
7. Repeat step 6 for the other collections. **recipes.json** for **recipe collection** and **users.json** for **users collection**.
8. Refresh each collection and check if all collections contain data.
9. Open any web browser then type **localhost:3000**
10. You should **now** be at the **default** landing page of yummers.


## Running the tests
Currently, since sessions are not yet implemented, the user logged-in is always *Nikki Domingo*  regardless of the login functionality

### Database read functions
1. At the **landing page**, all recipes and users are read from the database to the client. The **recipes read** from the database is shown as **posts** and the **users read** from the database are shown through the **post name**.
2.  **Cookbook** collection is read from the **database** when navigation to the **user's cookbook**.  
3. **Recipes collection** is when navigating to the **my recipe page**. **One user** is also read from the database who owns the recipes.
4.  **Profile page** reads one user from the **database** and also **reads** from the **recipe collection** to get the user's recipe.
5. On the **signout** page, there is an option to login. Logging in reads from the **user collection** to get the user with the same credentials.
6. **Editing** a user profile or recipe **reads the user/recipe being edited** from their respective collections.

### Database create functions
1. **Signup** creates a new user and **updates** the **users collection**.
2. **Add recipe** creates a new recipe and **updates** the **recipes collection**. The user **logged in** is saved as the **user id** for the **new** recipe.

### Database update functions
1. **Edit recipe** finds the recipe in the **recipes collection** and **updates** the data.
2. **Edit profile** finds the user in the **users collection** and **updates** the data.

### Database delete functions
1. At **Edit Profile**, the user can choose to delete a **recipe** the user created. Deleting a recipe on the client side also deletes a recipe on the **recipes collection**.

## Built with
- bootstrap
- node js
- mongoDB

## Versioning
We use github for versioning 


## Authors

* Ang, Charlene
* Domingo, Allexandra Nicole
* Roxas, Ronell John

## Acknowledgements
- Ms Unisse Chua for being there to guide and teach 
- Our families for the support and love
- To God