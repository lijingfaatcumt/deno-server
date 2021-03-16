import { Bson, userCollection } from "../database/index.ts";
import { getToken } from "../token/index.ts";

export async function create(ctx: any) {
  const { value } = ctx.request.body();

  try {
    const data = await value;
    if (!data || !("username" in data) || !("password" in data)) {
      ctx.response.status = 400;
      ctx.response.body = {
        error: "请传递用户名和密码",
      };
      return;
    }
    await userCollection.insertOne({
      username: data.username,
      password: data.password,
    });
    ctx.response.status = 200;
    ctx.response.body = {
      message: "创建成功",
    };
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = {
      error: err.message,
    };
  }
}

export async function remove(ctx: any) {
  if (!ctx.params["id"]) {
    ctx.response.status = 400;
    ctx.response.body = {
      error: "请传输要删除的用户id",
    };
    return;
  }
  try {
    await userCollection.deleteOne({
      _id: new Bson.ObjectId(ctx.params["id"]),
    });
    ctx.response.status = 200;
    ctx.response.body = "删除成功";
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = {
      error: err.message,
    };
  }
}

export async function get(ctx: any) {
  let id = ctx.params.id;
  if (id == null) {
    ctx.response.status = 400;
    ctx.response.body = {
      error: "请提供需要查询的用户id",
    };
    return;
  }
  try {
    let result = await userCollection.findOne({
      _id: new Bson.ObjectId(id),
    });
    ctx.response.status = 200;
    ctx.response.body = result;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = {
      error: err.message,
    };
  }
}

export async function update(ctx: any) {
  const { value } = ctx.request.body();
  const { _id, username, password } = await value;
  console.log(_id, username, password, 1111);
  if (_id == undefined) {
    ctx.response.status = 400;
    ctx.response.body = {
      error: "请提供需要更新的用户id",
    };
    return;
  }
  if (username == null && password == null) {
    ctx.response.status = 400;
    ctx.response.body = {
      error: "请提供需要更新的用户名或者密码",
    };
    return;
  }
  let operation: any = {};
  if (username) {
    operation["username"] = username;
  }
  if (password) {
    operation["password"] = password;
  }
  try {
    await userCollection.updateOne({
      _id: new Bson.ObjectId(_id),
    }, {
      $set: operation,
    });
    console.log(operation);
    ctx.response.status = 200;
    ctx.response.body = {
      message: "更新成功",
    };
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = {
      error: err.message,
    };
  }
}

export async function list(ctx: any) {
  try {
    const users = await userCollection.find();
    ctx.status = 200;
    ctx.response.body = users;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = {
      error: err.message,
    };
  }
}

export async function login(ctx: any) {
  const { value } = ctx.request.body();
  try {
    const { username, password } = await value;
    if (!username || !password) {
      ctx.response.status = 400;
      ctx.response.body = {
        error: "请提供用户名和密码",
      };
    }
    const user = await userCollection.findOne({
      username: username,
      password: password,
    });
    if (!user) {
      ctx.response.status = 400;
      ctx.response.body = {
        error: "用户名或者密码不正确",
      };
    }
    const token = await getToken({ username, password });
    ctx.response.status = 200;
    ctx.response.body = {
      token: token,
    };
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = {
      error: err.message,
    };
  }
}
