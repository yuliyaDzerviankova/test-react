import './App.scss';
import './mobile.scss';
import {ChangeEvent, useState} from "react";
import logo from './logo.svg';
import {useForm} from "react-hook-form";
import classNames from 'classnames';
import ErrorIcon from '@material-ui/icons/Error';

function App() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {register, formState} = useForm({mode: "onChange"});
    const {isValid, errors} = formState;

    const login = () => {
        const data = {email, password};
        console.log(data);
    };

    return (
        <div className="container">
            <div className="form">
                <div className="logo">
                    <img src={logo} alt="logo"/>
                </div>
                <form>
                    <label htmlFor="email">email</label>
                    <div className="form-control">
                        <input
                            id="email"
                            type="email"
                            name="email"
                            defaultValue={email}
                            ref={register({
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "Enter a valid e-mail address",
                                },
                            })}
                            className={classNames({invalidInput: errors.email})}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                        />
                        {
                            errors.email &&
                            <>
                                <span className="invalid">Please enter a valid email address</span>
                                <ErrorIcon/>
                            </>
                        }
                    </div>
                    <label htmlFor="password" className="password">password</label>
                    <div className="form-control">
                        <input
                            id="password"
                            type="password"
                            name="password"
                            defaultValue={password}
                            ref={register({
                                required: true,
                                minLength: 8
                            })}
                            className={classNames({invalidInput: errors.password})}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                        />
                        {
                            errors.password &&
                            <>
                                <ErrorIcon/>
                                <span className="invalid">Please enter a valid password</span>
                            </>
                        }
                    </div>
                    <button type="button" onClick={login} disabled={!isValid}>log in</button>
                </form>
            </div>
        </div>
    );
}

export default App;
