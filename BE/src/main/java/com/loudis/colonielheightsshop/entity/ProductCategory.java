package com.loudis.colonielheightsshop.entity;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "product_category")
public class ProductCategory
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String categoryName;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
    private Set<Product> products;

    public ProductCategory() {
    }

    public ProductCategory(Long id, String categoryName, Set<Product> products) {
        this.id = id;
        this.categoryName = categoryName;
        this.products = products;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }
}
