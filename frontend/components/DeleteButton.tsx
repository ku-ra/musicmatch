import axios from 'axios';
import Router, { useRouter } from 'next/router';
import qs from 'qs';
import Client from '../client/axios';

import { delete_auth_api } from '../constants/routes';

const DeleteButton = () => {
    const deleteUser = async () => {
        const response = await Client.post(delete_auth_api).catch((error) => { });

        if (response && response.status == 200) {
            window.location.href = '/';
        }
    }

    return (
        <>
            <button onClick={deleteUser} className="opacity-90 transition-all duration-200 ease-in-out hover:drop-shadow-lg bg-black hover:bg-black font-semibold py-4 px-6 border bg-gradient-to-r text-white rounded-full">
                Delete Account 
            </button>
        </>
    )
}

export default DeleteButton;