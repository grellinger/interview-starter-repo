package com.product.productsapi.model;

import java.math.BigDecimal;

public record ProductDTO(Long id, String name, String brand, BigDecimal price) {
}
