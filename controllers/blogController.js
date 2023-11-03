import {
    authorBlogService,
    createBlogService,
    detailBlogService,
    getAllBlogService,
    updateBlogService
} from "../services/blogService.js"

export const createBlogController = async (req, res) => {
    const {
        author, title, summary,
        mainArticle, subArticle, addPhoto
    } = req.body
    if (author && title && summary &&
        mainArticle && subArticle && addPhoto) {
        const response = await createBlogService({
            author, title, summary, mainArticle,
            subArticle, addPhoto
        })
        return res.json(response)
    } else {
        return res.json({
            status: 400,
            message: "Blog is require"
        })
    }
}

export const getAllBlogController = async (req, res) => {
    try {
        const response = await getAllBlogService();
        return res.status(200).json({
            status: 200,
            data: response,
        });
    } catch (error) {
        return res.status(404).json({
            status: "error",
            message: error,
        });
    }
};

export const detailBlogController = async (req, res) => {
    try {
        const { blogId } = req.params;
        if (blogId) {
            const response = await detailBlogService(blogId);
            return res.json(response);
        }
        return res.json({
            status: 400,
            message: "The id is require",
        });
    } catch (err) {
        return res.json({
            status: "err",
            message: err,
        });
    }
};

export const authorBlogController = async (req, res) => {
    try {
        const { authorId } = req.params;
        if (authorId) {
            const response = await authorBlogService(authorId);
            return res.json(response);
        }
        return res.json({
            status: 400,
            message: "The author is require",
        });
    } catch (err) {
        return res.json({
            status: "err",
            message: err,
        });
    }
};

export const updateBlogController = async (req, res) => {
    try {
        const { blogId } = req.params;
        const {
            title, summary, mainArticle,
            subArticle, addPhoto
        } = req.body
        if (blogId) {
            const response = await updateBlogService(
                blogId, title, summary, mainArticle,
                subArticle, addPhoto
            );
            if (response) {
                return res.json(response);
            } else {
                return res.json({
                    status: 400,
                    message: "The server is problem",
                });
            }
        } else {
            return res.json({
                status: 401,
                message: "The id is required",
            });
        }
    } catch (error) {
        return res.json({
            status: 400,
            message: error,
        });
    }
};

export const uploadImageBlog = async (req, res) => {
    const uploadImages = []
    for (let i = 0; i < req.files.length; i++) {
        const { path } = req.files[i]
        uploadImages.push(path);
    }
    res.status(200).json({
        message: 'upload success',
        content: uploadImages
    })
}