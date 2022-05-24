package com.example.bareuda.service;

import com.example.bareuda.entity.Answer;
import com.example.bareuda.entity.Like;
import com.example.bareuda.entity.Member;
import com.example.bareuda.entity.Product;

import java.util.List;

public interface ProductService {
    public List<Product> getRecommended(Member member);
    public List<Product> getRecommendedCategory(Member member, String category);
    public void productLike(Like like);
    public List<Product> autocomplete(String search);
    public List<Product> getlikeList(String mb_id);
    public Product findById(int p_id);
}
