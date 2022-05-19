package com.example.bareuda.service;

import com.example.bareuda.mapper.ProductMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class ProductServiceImpl {
    @Autowired
    private ProductMapper productMapper;
}
