package com.example.bareuda.controller;

import com.example.bareuda.service.ProductServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
public class ProductController {
    @Autowired
    private ProductServiceImpl productServiceImpl;
}
