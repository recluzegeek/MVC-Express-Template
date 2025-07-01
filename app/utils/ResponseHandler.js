export const successResponse = (res, data = {}, message = 'Success', statusCode = 200) => {
	data = data.length === 0 ? 'No Record Found' : data;
	return res.status(statusCode).json({
		status: 'success',
		message,
		data,
	});
};
