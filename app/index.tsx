import Posts from './posts';
import Admin from './admin';
import CreatePost from './admin/createpost';
import EditPost from './admin/editpost';
import Login from './login';
import Post from './post';
import { createStackNavigator } from '@react-navigation/stack';
import PageNotFound from './pagenotfound';
import NotAuthorized from './notauthorized';
import AdminUsers from './adminusers';

const Stack = createStackNavigator();

export default function App() {
  return ( 
      <Stack.Navigator>        
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="editpost" component={EditPost} />
        <Stack.Screen name="createpost" component={CreatePost} />
        <Stack.Screen name="posts" component={Posts} />
        <Stack.Screen name="post" component={Post} />
        <Stack.Screen name="notauthorized" component={NotAuthorized} />
        <Stack.Screen name="pagenotfound" component={PageNotFound} /> 
        <Stack.Screen name="admin" component={Admin} />
        <Stack.Screen name="adminusers" component={AdminUsers} />
      </Stack.Navigator>
  );
}