package com.example.bareuda.entity;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Product {
    private int p_id;
    private String p_name;
    private String p_result;
    private String p_link;
    private String p_rskin;
    private String p_rtrouble;
    private String p_rsti;
    private String p_brand;
    private String p_method;
    private String p_usertype;
    private String p_category;
    private String p_price;
    private String p_img;
    private float p_stars;

}
