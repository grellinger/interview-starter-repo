package com.product.productsapi.service;

import com.product.productsapi.model.ProductDTO;

import java.util.List;

public interface ProductService {
    List<ProductDTO> getAllProducts();
    ProductDTO saveProduct(ProductDTO productDTO);
}
