import React from "react";

import { Row, Col, Badge } from "antd";

const Users = (props) => {
    let { users } = props;

    return (
        <Row gutter={16} className='items'>
            {users
                ? users.map((item, index) => {
                      return (
                          <Col span={6} className='item' key={index}>
                              <div className='username'>
                                  {item.username}
                                  <Badge
                                      status={
                                          item.isOnline ? "success" : "error"
                                      }
                                  />
                              </div>
                              <div className='user-email'>{item.email}</div>
                          </Col>
                      );
                  })
                : "Users not found"}
        </Row>
    );
};

export default Users;
