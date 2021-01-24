import React from 'react';
import { AuthProfile } from '../pages/users/model/User';

export const AuthContext = React.createContext<AuthProfile>(undefined);
