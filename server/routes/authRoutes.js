import {signin, signup} from "../controllers/authentication";
import "../services/passport";
import passport from "passport";

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

export default app => {
    app.post("/auth/signin", requireSignin, signin);
    app.post("/auth/signup", signup);
};