const { body } = require('express-validator');

const inputReqs = {
    nameMinLength: 5,
    nameMaxLength: 20,
    namePattern: /[A-Za-z0-9 ]+/,
    category: ['phones', 'cases', 'screenprotectors', 'accessories'],
    descriptionMinLength: 20,
    price: 1,
    quantity: 1,
    imageURLPattern: /^(https?:\/\/).+/
}

const nameValidator = [
    body('name').isLength({ min: inputReqs.nameMinLength, max: inputReqs.nameMaxLength })
        .withMessage(`Name must be at least ${inputReqs.nameMinLength} but not more then ${inputReqs.nameMaxLength} characters.`),
    body('name').matches(inputReqs.namePattern).withMessage('Name must contains only english letters and/or numbers.')
]

const categoryValidator = [
    body('category').isIn(inputReqs.category).withMessage(`Wrong category, please choose one of ${inputReqs.category.join(', ')}.`)
]

const desctriptionValidator = [
    body('description').isLength({ min: inputReqs.descriptionMinLength })
        .withMessage(`Descriptions must be at least ${inputReqs.descriptionMinLength} characters long.`)
]

const priceValidator = [
    body('price').isInt({ min: inputReqs.price }).withMessage('Price must be positive number.')
]

const quantityValidator = [
    body('quantity').isInt({ min: inputReqs.quantity }).withMessage('Quantity must be positive number.')
]

const imageURLValidator = [
    body('imageURL').matches(inputReqs.imageURLPattern).withMessage('Image URL must be valid. Example : http://... or https://...')
]

module.exports = {
    nameValidator,
    categoryValidator,
    desctriptionValidator,
    priceValidator,
    quantityValidator,
    imageURLValidator
}
