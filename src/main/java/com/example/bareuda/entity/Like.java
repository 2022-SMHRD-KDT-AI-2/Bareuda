package com.example.bareuda.entity;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Like {
    private int like_id;
    private String m_id;
    private int p_id;
}
