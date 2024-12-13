import { Button, Form, Input } from 'antd';
import useLogin from './useLogin';

export const LoginPage = () => {
    const {
        form,
        handleLogin,
        loading
    } = useLogin()
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-center mb-4">
            <img src="https://i.imgur.com/hzUP28s.png" alt="Logo" className="w-20 h-20" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <Form layout='vertical' form={form} onFinish={handleLogin}>
            <Form.Item name='username' label='Username'>
                <Input />
            </Form.Item>
            <Form.Item name='password' label='Password'>
                <Input.Password />
            </Form.Item>
            <Button
              htmlType="submit"
              loading={loading}
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Login
            </Button>
        
          </Form>
        </div>
      </div>
    );
}
