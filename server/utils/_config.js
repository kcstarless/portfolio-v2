import dotenv from 'dotenv'
dotenv.config()  // Load environment variables from .env file

const getPort = () => {
    return process.env.PORT || 3001
}

const getMongoUri = () => {
    return process.env.NODE_ENV === 'test'
        ? process.env.TEST_MONGODB_URI
        : process.env.MONGODB_URI
}

// const MONGODB_URI = process.env.NODE_ENV === 'test'
//     ? process.env.TEST_MONGODB_URI
//     : process.env.MONGODB_URI   

export { getMongoUri, getPort }