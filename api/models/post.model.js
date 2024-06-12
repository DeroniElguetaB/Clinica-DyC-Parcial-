import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    contenido: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    celular: {
      type: String,
      required: true,
    },
    celularemergencia: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    edad: {
      type: String,
      required: true,
    },
    sanguineo: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },


    // image: {
    //   type: String,
    //   default:
    //     'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
    // },
    category: {
      type: String,
      default: 'uncategorized',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
