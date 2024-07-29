
```javascript
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const s3Client = new S3Client({});

export const handler = async (event) => {
    const bucketName = event.bucketName || 'shashank2027test'; 

    try {
        const command = new ListObjectsV2Command({
            Bucket: bucketName,
            MaxKeys: 10 // Limit to 10 objects for simplicity
        });

        const response = await s3Client.send(command);

        const objectList = response.Contents ? response.Contents.map(object => ({
            Key: object.Key,
            Size: object.Size,
            LastModified: object.LastModified
        })) : [];

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `Successfully listed objects in bucket ${bucketName}`,
                objects: objectList,
                count: objectList.length
            })
        };
    } catch (error) {
        console.error('Error listing objects:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: `Error listing objects in bucket ${bucketName}`,
                error: error.message
            })
        };
    }
};
```

Let's say the `event` object passed to the handler looks like this:

```json
{
    "bucketName": "example-bucket"
}
```

Now let's go through the code step by step with this example:

### 1. Import Statements
```javascript
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
```
- This imports the `S3Client` and `ListObjectsV2Command` from the AWS SDK for JavaScript. These are necessary for interacting with the S3 service.

### 2. Create S3 Client
```javascript
const s3Client = new S3Client({});
```
- This creates an S3 client instance. The client will be used to send commands to the S3 service. No configuration is provided here, so it will use default settings.

### 3. Define Lambda Handler
```javascript
export const handler = async (event) => {
```
- This defines the main handler function that AWS Lambda will invoke. It accepts an `event` parameter, which contains information about the request.

### 4. Get Bucket Name
```javascript
const bucketName = event.bucketName || 'shashank2027test';
```
- This line retrieves the bucket name from the `event` object. In this example, `event.bucketName` is `"example-bucket"`, so `bucketName` will be set to `"example-bucket"`. If `event.bucketName` were not provided, it would default to `'shashank2027test'`.

### 5. Start Try Block
```javascript
try {
```
- This begins a `try` block to handle potential errors that might occur during the execution of the subsequent code.

### 6. Create ListObjectsV2Command
```javascript
const command = new ListObjectsV2Command({
    Bucket: bucketName,
    MaxKeys: 10 // Limit to 10 objects for simplicity
});
```
- This creates a new `ListObjectsV2Command` with the specified bucket name (`"example-bucket"`) and limits the number of objects returned to 10.

### 7. Send Command to S3
```javascript
const response = await s3Client.send(command);
```
- This sends the `ListObjectsV2Command` to the S3 service using the `s3Client` and waits for the response. The `await` keyword ensures the code waits for the command to complete before moving on.

### 8. Process Response
```javascript
const objectList = response.Contents ? response.Contents.map(object => ({
    Key: object.Key,
    Size: object.Size,
    LastModified: object.LastModified
})) : [];
```
- This line processes the response from S3. If `response.Contents` exists (i.e., the bucket contains objects), it maps over each object to extract key information: `Key`, `Size`, and `LastModified`. These details are collected into the `objectList` array. If the bucket is empty, `objectList` will be an empty array.

### 9. Return Success Response
```javascript
return {
    statusCode: 200,
    body: JSON.stringify({
        message: `Successfully listed objects in bucket ${bucketName}`,
        objects: objectList,
        count: objectList.length
    })
};
```
- This constructs a success response with a status code of 200. The response body is a JSON string containing a success message, the list of objects, and the count of objects.

### 10. Catch Block for Errors
```javascript
} catch (error) {
    console.error('Error listing objects:', error);
    return {
        statusCode: 500,
        body: JSON.stringify({
            message: `Error listing objects in bucket ${bucketName}`,
            error: error.message
        })
    };
}
```
- If any error occurs in the `try` block, the `catch` block will handle it. It logs the error to the console and constructs an error response with a status code of 500. The response body contains an error message and the error details.

### Summary

When the function is invoked with the `event` containing `"bucketName": "example-bucket"`, it attempts to list up to 10 objects from the "example-bucket" S3 bucket. If successful, it returns a JSON response with the list of objects and their details. If an error occurs, it returns a JSON response with the error message.
