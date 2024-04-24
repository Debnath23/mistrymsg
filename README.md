# Error Handling

### There are two classes of errors that can occur with a Mongoose connection.

### 1. Error on initial connection: If initial connection fails, Mongoose will emit an 'error' event and the promise mongoose.connect() returns will reject. However, Mongoose will not automatically try to reconnect.

### 2. Error after initial connection was established: Mongoose will attempt to reconnect, and it will emit an 'error' event.

### 3. To handle initial connection errors, you should use .catch() or try/catch with async/await.

### mongoose.connect('mongodb://127.0.0.1:27017/test').
###  catch(error => handleError(error));

### Or:
### try {
###  await mongoose.connect('mongodb://127.0.0.1:27017/test');
### } catch (error) {
###  handleError(error);
### }

## 3. Options
### The connect method also accepts an options object which will be passed on to the underlying MongoDB driver.

### mongoose.connect(uri, options);

## 3.1 serverSelectionTimeoutMS
### The serverSelectionTimeoutMS option is extremely important: it controls how long the MongoDB Node.js driver will attempt to retry any operation before erroring out. This includes initial connection, like await mongoose.connect(), as well as any operations that make requests to MongoDB, like save() or find().

### By default, serverSelectionTimeoutMS is 30000 (30 seconds). This means that, for example, if you call mongoose.connect() when your standalone MongoDB server is down, your mongoose.connect() call will only throw an error after 30 seconds.

### mongoose.connect(uri, {
###  serverSelectionTimeoutMS: 5000
### });

## https://mongoosejs.com/docs/connections.html#error-handling



# SignUp

## Code should effectively handles both scenarios of registering a new user and updating an existing but unverified user account with a new password and verification code.

## Algorithm :
### IF existingUserByEmail EXISTS THEN
###   IF existingUserByEmail.isVerified Then
###     success: false;
###   ELSE
###     save the updated user;
###   END IF
###   ELSE
###     create a new user with the provided details
###     save the new user
### END IF