import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const s3Client = new S3Client({});

export const handler = async (event) => {
    const bucketName = event.bucketName || 'shashank2027test'; // Using the bucket name from your error message

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
