package com.example.bareuda.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@ToString
@Getter
@Setter
public class Detail {
    // 구매자 피부타입 분포 (백분율)
    private int type_o;
    private int type_d;
    private int type_n;
    private int type_t;
    private int type_c;

    private int rskin_1;
    private int rskin_2;
    private int rskin_3;

    private int rtrouble_1;
    private int rtrouble_2;
    private int rtrouble_3;

    private int rsti_1;
    private int rsti_2;
    private int rsti_3;
}
