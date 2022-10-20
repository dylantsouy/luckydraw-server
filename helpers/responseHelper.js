const errorHandler = (err) => {
    if (!err?.message) {
        return 'error';
    }
    if (err?.errors) {
        return err?.errors[0].message;
    } else {
        return err.message;
    }
};

const errorByFieldHandler = (err) => {
    if (!err?.message) {
        return 'error';
    }
    const errObj = [];
    if (err?.name === 'SequelizeValidationError') {
        err?.errors?.map((er) => {
            const result = {
                field: er.path,
                message: er.message,
            };
            errObj.push(result);
        });
        return errObj;
    } else {
        message = err.message;
        return err.message;
    }
};

module.exports = {
    errorHandler,
    errorByFieldHandler,
};
