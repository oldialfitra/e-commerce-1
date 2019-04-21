const app = require('../app'),
    chai = require('chai'),
    expect = chai.expect,
    chaiHttp = require('chai-http'),
    { userAdminRegister, userCustomerRegister, adminLogin, customerLogin, addProduct } = require('./public'),
    User = require('../models/user'),
    Cart = require('../models/cart'),
    Product = require('../models/product'),
    Transaction = require('../models/transaction')

let tokenAdmin = {
    token: ''
},
    tokenCustomer = {
        token: ''
    },
    idProduct = '',
    idProduct2 = '',
    idTransaction = ''
chai.use(chaiHttp)

after(done => {
    User
        .deleteMany({}, () => {
            done()
        })
})

after(done => {
    Cart
        .deleteMany({}, () => {
            done()
        })
})

after(done => {
    Product
        .deleteMany({}, () => {
            done()
        })
})

after(done => {
    Transaction
        .deleteMany({}, () => {
            done()
        })
})

describe('Route /users', function (done) {
    describe('/POST /users/signup', function () {
        describe('Success', function () {
            describe('Register as admin', function () {
                it.only('should return status code 201 response should be an objects', function (done) {
                    chai
                        .request(app)
                        .post('/users/signup')
                        .send(userAdminRegister)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(201)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('user')
                            expect(res.body).to.haveOwnProperty('list')
                            expect(res.body.list).to.be.an('array')
                            done()
                        })
                })
            })

            describe('Register as customer', function () {
                it.only('should return status code 201 response should be an objects', function (done) {
                    chai
                        .request(app)
                        .post('/users/signup')
                        .send(userCustomerRegister)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(201)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('user')
                            expect(res.body).to.haveOwnProperty('list')
                            expect(res.body.list).to.be.an('array')
                            done()
                        })
                })
            })
        })

        describe('Fail', function () {
            describe('Register as admin', function () {
                it.only('should return status code 400 for email response should be an objects', function (done) {
                    userAdminRegister.email = ''
                    chai
                        .request(app)
                        .post('/users/signup')
                        .send(userAdminRegister)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(400)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('Email required')
                            done()
                        })
                })
                it.only('should return status code 400 for password response should be an objects', function (done) {
                    userAdminRegister.email = 'admin2@mail.com'
                    userAdminRegister.password = ''
                    chai
                        .request(app)
                        .post('/users/signup')
                        .send(userAdminRegister)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(400)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('Password required')
                            done()
                        })
                })
                it.only('should return status code 400 for name response should be an objects', function (done) {
                    userAdminRegister.email = 'admin2@mail.com'
                    userAdminRegister.password = 'admin2'
                    userAdminRegister.name = ''
                    chai
                        .request(app)
                        .post('/users/signup')
                        .send(userAdminRegister)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(400)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('Name required')
                            done()
                        })
                })
                it.only('should return status code 400 for address response should be an objects', function (done) {
                    userAdminRegister.email = 'admin2@mail.com'
                    userAdminRegister.password = 'admin2'
                    userAdminRegister.name = 'Oldi'
                    userAdminRegister.address = ''
                    chai
                        .request(app)
                        .post('/users/signup')
                        .send(userAdminRegister)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(400)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('Address required')
                            done()
                        })
                })
                it.only('should return status code 400 for city response should be an objects', function (done) {
                    userAdminRegister.email = 'admin2@mail.com'
                    userAdminRegister.password = 'admin2'
                    userAdminRegister.name = 'Oldi'
                    userAdminRegister.address = 'Jalan jalan'
                    userAdminRegister.city = ''
                    chai
                        .request(app)
                        .post('/users/signup')
                        .send(userAdminRegister)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(400)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('City required')
                            done()
                        })
                })
                it.only('should return status code 400 for cityId response should be an objects', function (done) {
                    userAdminRegister.email = 'admin2@mail.com'
                    userAdminRegister.password = 'admin2'
                    userAdminRegister.name = 'Oldi'
                    userAdminRegister.address = 'Jalan jalan'
                    userAdminRegister.city = 'Jakarta Selatan'
                    userAdminRegister.cityId = ''
                    chai
                        .request(app)
                        .post('/users/signup')
                        .send(userAdminRegister)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(400)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('CityId required')
                            done()
                        })
                })
                it.only('should return status code 400 for password length less than 6 character response should be an objects', function (done) {
                    userAdminRegister.email = 'admin2@mail.com'
                    userAdminRegister.password = 'admin'
                    userAdminRegister.name = 'Oldi'
                    userAdminRegister.address = 'Jalan jalan'
                    userAdminRegister.city = 'Jakarta Selatan'
                    userAdminRegister.cityId = '152'
                    chai
                        .request(app)
                        .post('/users/signup')
                        .send(userAdminRegister)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(400)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('Minimal 6 characters')
                            done()
                        })
                })
                it.only('should return status code 400 for email already exists response should be an objects', function (done) {
                    userAdminRegister.email = 'admin@mail.com'
                    userAdminRegister.password = 'admin'
                    userAdminRegister.name = 'Oldi'
                    userAdminRegister.address = 'Jalan jalan'
                    userAdminRegister.city = 'Jakarta Selatan'
                    userAdminRegister.cityId = '152'
                    chai
                        .request(app)
                        .post('/users/signup')
                        .send(userAdminRegister)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(400)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('Validator failed for path `email` with value `admin@mail.com`')
                            done()
                        })
                })
            })

            describe('Register as customer', function () {
                it.only('should return status code 201 response should be an objects', function (done) {
                    userCustomerRegister.email = ''
                    chai
                        .request(app)
                        .post('/users/signup')
                        .send(userCustomerRegister)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(400)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('Email required')
                            done()
                        })
                })
                it.only('should return status code 400 for password response should be an objects', function (done) {
                    userCustomerRegister.email = 'alfitra@mail.com'
                    userCustomerRegister.password = ''
                    chai
                        .request(app)
                        .post('/users/signup')
                        .send(userCustomerRegister)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(400)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('Password required')
                            done()
                        })
                })
                it.only('should return status code 400 for name response should be an objects', function (done) {
                    userCustomerRegister.email = 'alfitra@mail.com'
                    userCustomerRegister.password = 'asdasd'
                    userCustomerRegister.name = ''
                    chai
                        .request(app)
                        .post('/users/signup')
                        .send(userCustomerRegister)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(400)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('Name required')
                            done()
                        })
                })
                it.only('should return status code 400 for address response should be an objects', function (done) {
                    userCustomerRegister.email = 'alfitra@mail.com'
                    userCustomerRegister.password = 'asdasd'
                    userCustomerRegister.name = 'Oldi'
                    userCustomerRegister.address = ''
                    chai
                        .request(app)
                        .post('/users/signup')
                        .send(userCustomerRegister)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(400)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('Address required')
                            done()
                        })
                })
                it.only('should return status code 400 for city response should be an objects', function (done) {
                    userCustomerRegister.email = 'alfitra@mail.com'
                    userCustomerRegister.password = 'asdasd'
                    userCustomerRegister.name = 'Oldi'
                    userCustomerRegister.address = 'Jalan jalan'
                    userCustomerRegister.city = ''
                    chai
                        .request(app)
                        .post('/users/signup')
                        .send(userCustomerRegister)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(400)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('City required')
                            done()
                        })
                })
                it.only('should return status code 400 for cityId response should be an objects', function (done) {
                    userCustomerRegister.email = 'alfitra@mail.com'
                    userCustomerRegister.password = 'asdasd'
                    userCustomerRegister.name = 'Oldi'
                    userCustomerRegister.address = 'Jalan jalan'
                    userCustomerRegister.city = 'Jakarta Selatan'
                    userCustomerRegister.cityId = ''
                    chai
                        .request(app)
                        .post('/users/signup')
                        .send(userCustomerRegister)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(400)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('CityId required')
                            done()
                        })
                })
                it.only('should return status code 400 for password length less than 6 character response should be an objects', function (done) {
                    userCustomerRegister.email = 'alfitra@mail.com'
                    userCustomerRegister.password = 'asdas'
                    userCustomerRegister.name = 'Oldi'
                    userCustomerRegister.address = 'Jalan jalan'
                    userCustomerRegister.city = 'Jakarta Selatan'
                    userCustomerRegister.cityId = '152'
                    chai
                        .request(app)
                        .post('/users/signup')
                        .send(userCustomerRegister)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(400)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('Minimal 6 characters')
                            done()
                        })
                })
                it.only('should return status code 400 for email already exists response should be an objects', function (done) {
                    userCustomerRegister.email = 'oldi@mail.com'
                    userCustomerRegister.password = 'asdasd'
                    userCustomerRegister.name = 'Oldi'
                    userCustomerRegister.address = 'Jalan jalan'
                    userCustomerRegister.city = 'Jakarta Selatan'
                    userCustomerRegister.cityId = '152'
                    chai
                        .request(app)
                        .post('/users/signup')
                        .send(userCustomerRegister)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(400)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('Validator failed for path `email` with value `oldi@mail.com`')
                            done()
                        })
                })
            })
        })
    })
    describe('/GET /users/city', function () {
        describe('Success', function () {
            describe('Get All City from API', function () {
                it.only('should return status code 200 response should be an array', function (done) {
                    chai
                        .request(app)
                        .get('/users/city')
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(200)
                            expect(res.body).to.have.be.an('array')
                            done()
                        })
                })
            })
        })
    })
    describe('/POST /users/signin', function () {
        describe('Success', function () {
            describe('Login as admin', function () {
                it.only('should return status code 200 response should be an objects', function (done) {
                    chai
                        .request(app)
                        .post('/users/signin')
                        .send(adminLogin)
                        .end(function (err, res) {
                            tokenAdmin.token = res.body.token
                            expect(err).to.be.null
                            expect(res).to.have.status(200)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('token')
                            expect(res.body).to.haveOwnProperty('role')
                            expect(res.body.role).to.equal('admin')
                            // expect(res.body.list).to.be.an('array')
                            done()
                        })
                })
            })
            describe('Login as customer', function () {
                it.only('should return status code 200 response should be an objects', function (done) {
                    chai
                        .request(app)
                        .post('/users/signin')
                        .send(customerLogin)
                        .end(function (err, res) {
                            tokenCustomer.token = res.body.token
                            expect(err).to.be.null
                            expect(res).to.have.status(200)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('token')
                            expect(res.body).to.haveOwnProperty('role')
                            expect(res.body.role).to.equal('customer')
                            done()
                        })
                })
            })
        })
        describe('Fail', function () {
            describe('Login as admin', function () {
                it.only('should return status code 400 for email response should be an objects', function (done) {
                    adminLogin.email = ''
                    chai
                        .request(app)
                        .post('/users/signin')
                        .send(adminLogin)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(400)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('email / password wrong')
                            done()
                        })
                })
                it.only('should return status code for password response should be an objects', function (done) {
                    adminLogin.email = 'admin@mail.com'
                    adminLogin.password = ''
                    chai
                        .request(app)
                        .post('/users/signin')
                        .send(adminLogin)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(400)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('email / password wrong')
                            done()
                        })
                })
            })
            describe('Login as customer', function () {
                it.only('should return status code 400 for email response should be an objects', function (done) {
                    adminLogin.email = ''
                    chai
                        .request(app)
                        .post('/users/signin')
                        .send(adminLogin)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(400)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('email / password wrong')
                            done()
                        })
                })
                it.only('should return status code 400 for password response should be an objects', function (done) {
                    adminLogin.email = 'oldi@mail.com'
                    adminLogin.password = ''
                    chai
                        .request(app)
                        .post('/users/signin')
                        .send({ token: adminLogin })
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(400)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('email / password wrong')
                            done()
                        })
                })
            })
        })
    })
})

describe('Route /products', function (done) {
    describe('/POST /products', function () {
        describe('Success', function () {
            describe('Add Product', function () {
                it.only('should return status code 201 response should be an objects', function (done) {
                    chai
                        .request(app)
                        .post('/products')
                        .send(addProduct)
                        .set(tokenAdmin)
                        .end(function (err, res) {
                            idProduct = res.body._id
                            expect(err).to.be.null
                            expect(res).to.have.status(201)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('_id')
                            expect(res.body).to.haveOwnProperty('name')
                            expect(res.body).to.haveOwnProperty('amount')
                            expect(res.body).to.haveOwnProperty('price')
                            expect(res.body.name).to.equal('kompor')
                            expect(res.body.amount).to.equal(10)
                            expect(res.body.price).to.equal(10000)
                            done()
                        })
                })
                it.only('should return status code 201 response should be an objects', function (done) {
                    chai
                        .request(app)
                        .post('/products')
                        .send(addProduct)
                        .set(tokenAdmin)
                        .end(function (err, res) {
                            idProduct2 = res.body._id
                            expect(err).to.be.null
                            expect(res).to.have.status(201)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('_id')
                            expect(res.body).to.haveOwnProperty('name')
                            expect(res.body).to.haveOwnProperty('amount')
                            expect(res.body).to.haveOwnProperty('price')
                            expect(res.body.name).to.equal('kompor')
                            expect(res.body.amount).to.equal(10)
                            expect(res.body.price).to.equal(10000)
                            done()
                        })
                })
            })
        })
        describe('Fail', function () {
            describe('Add Product', function () {
                it.only('should return status code 401 for customer add product response should be an objects', function (done) {
                    chai
                        .request(app)
                        .post('/products')
                        .send(addProduct)
                        .set(tokenCustomer)
                        .end(function (err, res) {
                            console.log(res.body, 'ini add product')
                            console.log(res.status)
                            expect(err).to.be.null
                            expect(res).to.have.status(401)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('You are not Authorized')
                            done()
                        })
                })
                it.only('should return status code 400 for admin add product response should be an objects', function (done) {
                    addProduct.name = ''
                    chai
                        .request(app)
                        .post('/products')
                        .send(addProduct)
                        .set(tokenAdmin)
                        .end(function (err, res) {
                            console.log(res.body)
                            expect(err).to.be.null
                            expect(res).to.have.status(400)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('Product name required')
                            done()
                        })
                })
                it.only('should return status code 400 for admin add product response should be an objects', function (done) {
                    addProduct.name = 'listrik'
                    addProduct.amount = -1
                    chai
                        .request(app)
                        .post('/products')
                        .send(addProduct)
                        .set(tokenAdmin)
                        .end(function (err, res) {
                            console.log(res.body)
                            expect(err).to.be.null
                            expect(res).to.have.status(400)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('Minimal 0')
                            done()
                        })
                })
                it.only('should return status code 400 for admin add product response should be an objects', function (done) {
                    addProduct.name = 'listrik'
                    addProduct.amount = 20
                    addProduct.price = -1
                    chai
                        .request(app)
                        .post('/products')
                        .send(addProduct)
                        .set(tokenAdmin)
                        .end(function (err, res) {
                            console.log(res.body)
                            expect(err).to.be.null
                            expect(res).to.have.status(400)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('Minimal 0')
                            done()
                        })
                })
                it.only('should return status code 401 for add product without token response should be an objects', function (done) {
                    addProduct.name = ''
                    chai
                        .request(app)
                        .post('/products')
                        .send(addProduct)
                        .end(function (err, res) {
                            console.log(res.body, '=================')
                            expect(err).to.be.null
                            expect(res).to.have.status(401)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('Login First')
                            done()
                        })
                })
            })
        })
    })
    describe('/GET /products', function () {
        describe('Success', function () {
            describe('Get All Product', function () {
                it.only('should return status code 200 response should be an array', function (done) {
                    chai
                        .request(app)
                        .get('/products')
                        .send(addProduct)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(200)
                            expect(res.body).to.have.be.an('array')
                            done()
                        })
                })
            })
            describe('Get One Product', function () {
                it.only('should return status code 200 response should be an objects', function (done) {
                    chai
                        .request(app)
                        .get(`/products/${idProduct}`)
                        .send(addProduct)
                        .set(tokenAdmin)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(200)
                            expect(res.body).to.have.be.an('object')
                            done()
                        })
                })
            })
        })
    })
    describe('/PUT /products', function () {
        describe('Success', function () {
            describe('Update Product', function () {
                it.only('should return status code 200 response should be an objects', function (done) {
                    addProduct.name = 'kompor listrik'
                    addProduct.amount = 1000
                    addProduct.price = 500000
                    chai
                        .request(app)
                        .put(`/products/${idProduct}`)
                        .send(addProduct)
                        .set(tokenAdmin)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(200)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('_id')
                            expect(res.body).to.haveOwnProperty('name')
                            expect(res.body).to.haveOwnProperty('amount')
                            expect(res.body).to.haveOwnProperty('price')
                            expect(res.body.name).to.equal('kompor listrik')
                            expect(res.body.amount).to.equal(1000)
                            expect(res.body.price).to.equal(500000)
                            done()
                        })
                })
            })
            describe('Fail', function () {
                describe('Update Product', function () {
                    it.only('should return status code 401 response should be an objects', function (done) {
                        addProduct.name = ''
                        chai
                            .request(app)
                            .put(`/products/${idProduct}`)
                            .send(addProduct)
                            .end(function (err, res) {
                                console.log(res.body, 'ini put')
                                expect(err).to.be.null
                                expect(res).to.have.status(401)
                                expect(res.body).to.have.be.an('object')
                                expect(res.body).to.haveOwnProperty('message')
                                expect(res.body.message).to.equal('Login First')
                                done()
                            })
                    })
                    it.only('should return status code 401 response should be an objects', function (done) {
                        addProduct.name = ''
                        chai
                            .request(app)
                            .put(`/products/${idProduct}`)
                            .send(addProduct)
                            .set(tokenCustomer)
                            .end(function (err, res) {
                                console.log(res.body, 'ini put')
                                expect(err).to.be.null
                                expect(res).to.have.status(401)
                                expect(res.body).to.have.be.an('object')
                                expect(res.body).to.haveOwnProperty('message')
                                expect(res.body.message).to.equal('You are not Authorized')
                                done()
                            })
                    })
                })
            })
        })
        describe('/DELETE /products', function () {
            describe('Fail', function () {
                describe('Delete Product', function () {
                    it.only('should return status code 200 response should be an objects', function (done) {
                        chai
                            .request(app)
                            .delete(`/products/${idProduct}`)
                            .end(function (err, res) {
                                expect(err).to.be.null
                                expect(res).to.have.status(401)
                                expect(res.body).to.have.be.an('object')
                                expect(res.body).to.haveOwnProperty('message')
                                expect(res.body.message).to.equal('Login First')
                                done()
                            })
                    })
                    it.only('should return status code 200 response should be an objects', function (done) {
                        chai
                            .request(app)
                            .delete(`/products/${idProduct}`)
                            .set(tokenCustomer)
                            .end(function (err, res) {
                                expect(err).to.be.null
                                expect(res).to.have.status(401)
                                expect(res.body).to.have.be.an('object')
                                expect(res.body).to.haveOwnProperty('message')
                                expect(res.body.message).to.equal('You are not Authorized')
                                done()
                            })
                    })
                })
            })
            describe('Success', function () {
                describe('Delete Product', function () {
                    it.only('should return status code 200 response should be an objects', function (done) {
                        chai
                            .request(app)
                            .delete(`/products/${idProduct}`)
                            .set(tokenAdmin)
                            .end(function (err, res) {
                                expect(err).to.be.null
                                expect(res).to.have.status(200)
                                expect(res.body).to.have.be.an('object')
                                expect(res.body).to.haveOwnProperty('_id')
                                expect(res.body).to.haveOwnProperty('name')
                                expect(res.body).to.haveOwnProperty('amount')
                                expect(res.body).to.haveOwnProperty('price')
                                expect(res.body.name).to.equal('kompor listrik')
                                expect(res.body.amount).to.equal(1000)
                                expect(res.body.price).to.equal(500000)
                                done()
                            })
                    })
                })
            })
        })
    })
})

describe('Route /carts', function (done) {
    describe('/GET /carts', function () {
        describe('Success', function () {
            describe('Get Carts', function () {
                it.only('should return status code 201 response should be an objects', function (done) {
                    chai
                        .request(app)
                        .get('/carts/my')
                        .send(addProduct)
                        .set(tokenCustomer)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(200)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('user')
                            expect(res.body).to.haveOwnProperty('list')
                            expect(res.body.list).to.have.be.an('array')
                            done()
                        })
                })
            })
        })
        describe('Fail', function () {
            describe('Get Carts', function () {
                it.only('should return status code 401 response should be an objects', function (done) {
                    chai
                        .request(app)
                        .get('/carts/my')
                        .send(addProduct)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(401)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('Login First')
                            done()
                        })
                })
            })
        })
    })
    describe('/PUT /carts/buy', function () {
        describe('Success', function () {
            describe('Buy a Product', function () {
                it.only('should return status code 200 response should be an objects', function (done) {
                    chai
                        .request(app)
                        .put('/carts/buy')
                        .send({
                            product: idProduct2
                        })
                        .set(tokenCustomer)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(200)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('name')
                            expect(res.body).to.haveOwnProperty('amount')
                            expect(res.body).to.haveOwnProperty('price')
                            expect(res.body.amount).to.equal(9)
                            expect(res.body.name).to.equal('kompor')
                            done()
                        })
                })
            })
        })
        describe('Fail', function () {
            describe('Buy a Product', function () {
                it.only('should return status code 404 response should be an objects', function (done) {
                    chai
                        .request(app)
                        .put('/carts/buy')
                        .send()
                        .set(tokenCustomer)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(500)
                            expect(res.body).to.have.be.an('object')
                            done()
                        })
                })
                it.only('should return status code 404 response should be an objects', function (done) {
                    chai
                        .request(app)
                        .put('/carts/buy')
                        .send()
                        .end(function (err, res) {
                            console.log(res.body, 'ini body buy ====================')
                            expect(err).to.be.null
                            expect(res).to.have.status(401)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('Login First')
                            done()
                        })
                })
            })
        })
    })
    describe('/PUT /carts/change', function () {
        describe('Success', function () {
            describe('Add Product from Cart one by one', function () {
                it.only('should return status code 200 response should be an objects', function (done) {
                    chai
                        .request(app)
                        .put('/carts/change')
                        .send({
                            option: 'plus',
                            product: idProduct2
                        })
                        .set(tokenCustomer)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(200)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('name')
                            expect(res.body).to.haveOwnProperty('amount')
                            expect(res.body).to.haveOwnProperty('price')
                            expect(res.body.amount).to.equal(8)
                            expect(res.body.name).to.equal('kompor')
                            done()
                        })
                })
            })
            describe('Remove Product from Cart one by one', function () {
                it.only('should return status code 200 response should be an objects', function (done) {
                    chai
                        .request(app)
                        .put('/carts/change')
                        .send({
                            option: 'minus',
                            product: idProduct2
                        })
                        .set(tokenCustomer)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(200)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('name')
                            expect(res.body).to.haveOwnProperty('amount')
                            expect(res.body).to.haveOwnProperty('price')
                            expect(res.body.amount).to.equal(9)
                            expect(res.body.name).to.equal('kompor')
                            done()
                        })
                })
            })
        })
        describe('Fail', function () {
            describe('Remove Product from Cart one by one', function () {
                it.only('should return status code 404 for remove product from cart one by one response should be an objects', function (done) {
                    chai
                        .request(app)
                        .put('/carts/change')
                        .send({
                            option: 'minus',
                            product: idProduct2
                        })
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(401)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('Login First')
                            done()
                        })
                })
            })
            describe('Add Product from Cart one by one', function () {
                it.only('should return status code 404 for add product from cart one by one response should be an objects', function (done) {
                    chai
                        .request(app)
                        .put('/carts/change')
                        .send({
                            option: 'plus',
                            product: idProduct2
                        })
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(401)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('Login First')
                            done()
                        })
                })
            })
        })
    })
    describe('/PUT /carts/remove', function () {
        describe('Success', function () {
            describe('Remove Product(s) from Cart', function () {
                it.only('should return status code 200 response should be an objects', function (done) {
                    chai
                        .request(app)
                        .put('/carts/remove')
                        .send({
                            product: idProduct2
                        })
                        .set(tokenCustomer)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(200)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('list')
                            expect(res.body).to.haveOwnProperty('user')
                            expect(res.body.list).to.have.be.an('array')
                            expect(res.body.list.length).to.equal(0)
                            done()
                        })
                })
            })
        })
        describe('Fail', function () {
            describe('Remove Product(s) from Cart', function () {
                describe('Remove Product(s) from Cart', function () {
                    it.only('should return status code 401 response should be an objects', function (done) {
                        chai
                            .request(app)
                            .put('/carts/remove')
                            .send({
                                product: idProduct2
                            })
                            .end(function (err, res) {
                                expect(err).to.be.null
                                expect(res).to.have.status(401)
                                expect(res.body).to.have.be.an('object')
                                expect(res.body).to.haveOwnProperty('message')
                                expect(res.body.message).to.equal('Login First')
                                done()
                            })
                    })
                })
            })
        })
    })
    describe('/PUT /carts/checkout', function () {
        describe('Success', function () {
            describe('Checkout cart to transaction', function () {
                it.only('should return status code 200 response should be an objects', function (done) {
                    chai
                        .request(app)
                        .put('/carts/buy')
                        .send({
                            product: idProduct2
                        })
                        .set(tokenCustomer)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(200)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('name')
                            expect(res.body).to.haveOwnProperty('amount')
                            expect(res.body).to.haveOwnProperty('price')
                            expect(res.body.amount).to.equal(9)
                            expect(res.body.name).to.equal('kompor')
                            done()
                        })
                })
                it.only('should return status code 201 response should be an objects', function (done) {
                    chai
                        .request(app)
                        .post('/transactions')
                        .send({ total: 10000 })
                        .set(tokenCustomer)
                        .end(function (err, res) {
                            idTransaction = res.body._id
                            expect(err).to.be.null
                            expect(res).to.have.status(201)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('list')
                            expect(res.body).to.haveOwnProperty('user')
                            expect(res.body.list).to.have.be.an('array')
                            expect(res.body.list.length).to.equal(1)
                            done()
                        })
                })
                it.only('should return status code 200 response should be an objects', function (done) {
                    chai
                        .request(app)
                        .put('/carts/checkout')
                        .set(tokenCustomer)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(200)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('list')
                            expect(res.body).to.haveOwnProperty('user')
                            expect(res.body.list).to.have.be.an('array')
                            expect(res.body.list.length).to.equal(0)
                            done()
                        })
                })
            })
        })
        describe('Fail', function () {
            describe('checkout cart to transaction', function () {
                it.only('should return status code 401 response should be an objects', function (done) {
                    chai
                        .request(app)
                        .put('/carts/checkout')
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(401)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('Login First')
                            done()
                        })
                })
            })
        })
    })
})

describe('Route /transactions', function (done) {
    describe('/GET /transactions', function () {
        describe('Success', function () {
            describe('Get All Transactions for admin', function () {
                it.only('should return status code 200 response should be an objects', function (done) {
                    chai
                        .request(app)
                        .get('/transactions')
                        .set(tokenAdmin)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(200)
                            expect(res.body).to.have.be.an('array')
                            done()
                        })
                })
            })
        })
        describe('Success', function () {
            describe('Get All Transactions for admin', function () {
                it.only('should return status code 401 response should be an objects', function (done) {
                    chai
                        .request(app)
                        .get('/transactions')
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(401)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('Login First')
                            done()
                        })
                })
            })
        })
    })
    describe('/GET /transactions/my', function () {
        describe('Success', function () {
            describe('Get My Transactions', function () {
                it.only('should return status code 200 response should be an objects', function (done) {
                    chai
                        .request(app)
                        .get('/transactions/my')
                        .set(tokenCustomer)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(200)
                            expect(res.body).to.have.be.an('array')
                            done()
                        })
                })
            })
        })
        describe('Fail', function () {
            describe('Get My Transactions', function () {
                it.only('should return status code 401 response should be an objects', function (done) {
                    chai
                        .request(app)
                        .get('/transactions/my')
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(401)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('Login First')
                            done()
                        })
                })
            })
        })
    })
    describe('/PUT /transactions/send/:id', function () {
        describe('Success', function () {
            describe('Send Product to customer after transaction by admin', function () {
                it.only('should return status code 200 response should be an objects', function (done) {
                    chai
                        .request(app)
                        .put(`/transactions/send/${idTransaction}`)
                        .set(tokenAdmin)
                        .end(function (err, res) {
                            console.log(res.body, 'send it==============')
                            expect(err).to.be.null
                            expect(res).to.have.status(200)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('status')
                            expect(res.body).to.haveOwnProperty('list')
                            expect(res.body).to.haveOwnProperty('user')
                            expect(res.body).to.haveOwnProperty('total')
                            expect(res.body.list).to.have.be.an('array')
                            expect(res.body.list.length).to.equal(1)
                            expect(res.body.total).to.equal(10000)
                            expect(res.body.status).to.equal('send')
                            done()
                        })
                })
            })
        })
        describe('Fail', function () {
            describe('Send Product to customer after transaction by admin', function () {
                it.only('should return status code 401 response should be an objects', function (done) {
                    chai
                        .request(app)
                        .put(`/transactions/send/${idTransaction}`)
                        .end(function (err, res) {
                            expect(err).to.be.null
                            expect(res).to.have.status(401)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('Login First')
                            done()
                        })
                })
                it.only('should return status code 401 response should be an objects', function (done) {
                    chai
                        .request(app)
                        .put(`/transactions/send/${idTransaction}`)
                        .set(tokenCustomer)
                        .end(function (err, res) {
                            console.log(res.body, '--------------------------')
                            expect(err).to.be.null
                            expect(res).to.have.status(401)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('You are not Authorized')
                            done()
                        })
                })
            })
        })
    })
    describe('/PUT /transactions/confirm/:id', function () {
        describe('Success', function () {
            describe('Confirmation transaction by customer after admin sending product to customer', function () {
                it.only('should return status code 200 response should be an objects', function (done) {
                    chai
                        .request(app)
                        .put(`/transactions/confirm/${idTransaction}`)
                        .set(tokenCustomer)
                        .end(function (err, res) {
                            console.log(res.body, 'send it')
                            expect(err).to.be.null
                            expect(res).to.have.status(200)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('status')
                            expect(res.body).to.haveOwnProperty('list')
                            expect(res.body).to.haveOwnProperty('user')
                            expect(res.body).to.haveOwnProperty('total')
                            expect(res.body.list).to.have.be.an('array')
                            expect(res.body.list.length).to.equal(1)
                            expect(res.body.total).to.equal(10000)
                            expect(res.body.status).to.equal('confirm')
                            done()
                        })
                })
            })
        })
        describe('Success', function () {
            describe('Confirmation transaction by customer after admin sending product to customer', function () {
                it.only('should return status code 401 response should be an objects', function (done) {
                    chai
                        .request(app)
                        .put(`/transactions/confirm/${idTransaction}`)
                        .end(function (err, res) {
                            console.log(res.body, 'send it')
                            expect(err).to.be.null
                            expect(res).to.have.status(401)
                            expect(res.body).to.have.be.an('object')
                            expect(res.body).to.haveOwnProperty('message')
                            expect(res.body.message).to.equal('Login First')
                            done()
                        })
                })
            })
        })
    })
})