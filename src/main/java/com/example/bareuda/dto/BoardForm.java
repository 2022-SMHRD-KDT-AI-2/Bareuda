package com.example.bareuda.dto;

import com.example.bareuda.entity.Board;
import lombok.AllArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@ToString
public class BoardForm {
    private String title;
    private String content;

    public Board toEntity() {
        return new Board(null, title, content);
    }
}
