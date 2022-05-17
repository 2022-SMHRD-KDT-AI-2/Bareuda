package com.example.bareuda.dto;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class BaumanTestForm {

    private int[] part1;
    private int[] part2;
    private int[] part3;
    private int[] part4;

    public int[] calScore(){
        // 고민. 이차원 배열+이중 for문으로 만들까.
        // 모든 파트에 대해 문제 개수가 몇개인지. 만약 같다면 하나의 for문으로 합치자.
        int scores[] = new int[4];
        for(int i=0; i<part1.length; i++){
            scores[0] += part1[i];
        }
        for(int i=0; i<part2.length; i++){
            scores[1] += part2[i];
        }
        for(int i=0; i<part3.length; i++){
            scores[2] += part3[i];
        }
        for(int i=0; i<part4.length; i++){
            scores[3] += part4[i];
        }
        return scores;
    }
}
