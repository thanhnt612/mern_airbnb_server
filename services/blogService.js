import { Blog } from "../model/BlogModel.js";


//Process API
export const createBlogService = ({ author, title, summary, mainArticle,
    subArticle, addPhoto }) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (author) {
                const newBlog = await Blog.create({
                    author, title, summary, mainArticle,
                    subArticle, photos: addPhoto
                })
                resolve({
                    status: 200,
                    message: "Created a new Blog",
                    data: {
                        newBlog
                    }
                })
            }
        } catch (error) {
            reject({
                message: error,
                status: 403
            })
        }
    }).catch((e) => console.log(e))
}
export const getAllBlogService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const getAllBlog = await Blog.find().populate('author', 'name _id');
            resolve({
                status: 200,
                content: getAllBlog,
            });
        } catch (error) {
            reject({
                status: 400,
                message: error,
            });
        }
    });
};
export const detailBlogService = (blogId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findBlog = await Blog.findById(blogId);
            if (findBlog) {
                resolve({
                    status: 200,
                    content: findBlog,
                });
            }
            resolve({
                status: 204,
                message: "Blog is not defined",
            });
        } catch (err) {
            reject({
                message: err,
                status: 400,
            });
        }
    }).catch((e) => console.log(e));
}
export const authorBlogService = (authorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findBlog = await Blog.find({ "author": authorId });
            if (findBlog) {
                resolve({
                    status: 200,
                    content: findBlog,
                });
            }
            resolve({
                status: 204,
                message: "Author is not defined",
            });
        } catch (err) {
            reject({
                message: err,
                status: 400,
            });
        }
    }).catch((e) => console.log(e));
}
export const updateBlogService = (blogId, author, title, summary,
    mainArticle, subArticle, addPhoto) => {
    return new Promise(async (resolve, reject) => {
        try {
            const blogData = {
                author, title, summary, mainArticle, subArticle, addPhoto
            }
            const findBlog = await Blog.findById(blogId);
            findBlog.title = blogData.title;
            findBlog.summary = blogData.summary;
            findBlog.mainArticle = blogData.mainArticle;
            findBlog.subArticle = blogData.subArticle;
            findBlog.photos = blogData.addPhoto;
            await findBlog.save();
            if (findBlog) {
                resolve({
                    status: 200,
                    message: "Updated successfully",
                    data: findBlog,
                });
            } else {
                resolve({
                    status: 204,
                    message: "The blog is not defined",
                });
            }
        } catch (error) {
            console.log(error);
            reject({
                status: 400,
                massage: error,
            });
        }
    }).catch((e) => console.log(e));
};