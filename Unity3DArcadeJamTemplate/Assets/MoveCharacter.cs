﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MoveCharacter : MonoBehaviour {
    public InputHelper inputHelper;
    public float speed = 1.0f;
    private Rigidbody2D rigidbody2D;

    void Start()
    {
        rigidbody2D = GetComponent<Rigidbody2D>();
    }

    // Update is called once per frame
    void Update () {
        var vertical = 0;
        var horizontal = 0;
        if (Input.GetKey(inputHelper.up))
        {
            vertical += 1;
        }
        if (Input.GetKey(inputHelper.down))
        {
            vertical -= 1;
        }
        if (Input.GetKey(inputHelper.left))
        {
            horizontal -= 1;
        }
        if (Input.GetKey(inputHelper.right))
        {
            horizontal += 1;
        }
        var angle = new Vector2((float)horizontal, (float)vertical);
        var change = angle.normalized * speed;
        rigidbody2D.velocity = change;
        
	}
}
