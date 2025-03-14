import Joi from 'joi';

const paginationSchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(100).default(10),
});

const validatePagination = (req, res, next) => {
    const { error, value } = paginationSchema.validate(req.query);
    if (error) {
        return res.status(400).json({ message: error.message });
    }
    req.query = value;
    next();
};

export default validatePagination;