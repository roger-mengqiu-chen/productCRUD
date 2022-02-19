const Product = require('../model/product');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('product', {
        products: products,
        pageTitle: 'All Products',
        path: '/'
      })
    })
    .catch(err => {
      console.log(err);
    });
  };

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findByPk(prodId)
  .then(product => {
    res.render('product-detail', {
      product: product,
      pageTitle: product.title,
      path:'/'
    });
  })
  .catch(err => console.log(err));
};

exports.getAddProduct = (req, res, next) => {
  res.render('edit-product', {
    pageTitle: 'Add Product',
    path: '/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = Product.build({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description
  })

  product.save()
  .then(() => {
    console.log("Created a new product");
    res.redirect('/');
  })
  .catch(err => {
    console.log(err)
  })
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
  .then(product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('edit-product', {
      pageTitle: 'Edit Product',
      path:'/edit-product',
      editing: editMode,
      product: product
    });
  })
  .catch(err => {
    console.log(err);
  });
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findByPk(productId)
  .then(product => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDesc;
    product.imageUrl = updatedImageUrl;
    return product.save();
  })
  .then(result => {
    console.log('Updated product');
    res.redirect('/');
  })
  .catch(err => {
    console.log(err);
  })
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.findByPk(productId)
  .then(product => {
    return product.destroy();
  })
  .then(result => {
    console.log('Product deleted');
    res.redirect('/');
  })
  .catch(err => {
    console.log(err);
  })
};



