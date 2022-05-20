package com.example.bareuda.service;

import com.example.bareuda.entity.Answer;
import com.example.bareuda.entity.Like;
import com.example.bareuda.entity.Member;
import com.example.bareuda.entity.Product;
import com.example.bareuda.mapper.BaumannMapper;
import com.example.bareuda.mapper.ProductMapper;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductMapper productMapper;
    @Autowired
    private BaumannMapper baumannMapper;

    @Override
    public List<Product> getRecommended(Member member) {
        Answer answer = baumannMapper.findById(member.getMb_id());
        String[] types = new String[4];
        String type = answer.getMb_result();
        for(int i=0; i<4; i++){
            types[i] = "%"+type.charAt(i)+"%";
        }
        List<Product> products = productMapper.getRecommended(types[0], types[1], types[2], types[3]);
        return products;
    }

    @Override
    public List<Product> getRecommendedCategory(Member member, String category) {
        Answer answer = baumannMapper.findById(member.getMb_id());
        String[] types = new String[4];
        String type = answer.getMb_result();
        for(int i=0; i<4; i++){
            types[i] = "%"+type.charAt(i)+"%";
        }
        List<Product> products = productMapper.getRecommendedCategory(types[0], types[1], types[2], types[3], category);
        return products;
    }

    @Override
    public void productLike(Like like) {
        int isLike = productMapper.selectLike(like);
        if(isLike != 0) {
            productMapper.deleteLike(like);
        }
        else {
            productMapper.insertLike(like);
        }
    }

    @Override
    public List<Product> getlikeList(String mb_id) {
        List<Product> list = productMapper.getlikeList(mb_id);
        return list;
    }
}
