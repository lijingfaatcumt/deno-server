import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  create,
  get,
  list,
  login,
  remove,
  update,
} from "../controller/user-controller.ts";

const router = new Router();

router.get("/user/:id", get);
router.get("/users", list);
router.delete("/user/:id", remove);
router.put("/user", update);
router.post("/user", create);
router.post("/login", login);

export default router;
