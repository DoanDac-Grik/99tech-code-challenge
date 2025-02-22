import mongoose from 'mongoose';
import config from './index';

mongoose.set('debug', config.DEBUG_DB);

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URL, {
      ignoreUndefined: true,
    });
    console.log('Connect to MongoDB successfully!');
  } catch (error) {
    console.log('Fail to connect to MongoDB', error);
  }
};
