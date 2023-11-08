import React from 'react'

const googleSignIn=()=>{
    const rootURL="https://accounts.google.com/o/oauth2/v2/auth"

    const options={
        redirect_uri:process.env.GOOGLE_CLIENT_REDIRECT_URL,
        client_id:process.env.GOOGLE_CLIENT_ID,
        access_type:'online',
        respose_type:'code',
        prompt:'consent',
        scopes:[
            'https://mail.google.com/',
            'https://www.googleapis.com/auth/gmail.addons.current.action.compose',
            'https://www.googleapis.com/auth/gmail.addons.current.message.action',
            'https://www.googleapis.com/auth/gmail.addons.current.message.metadata',
            'https://www.googleapis.com/auth/gmail.addons.current.message.readonly',
            'https://www.googleapis.com/auth/gmail.compose',
            'https://www.googleapis.com/auth/gmail.insert',
            'https://www.googleapis.com/auth/gmail.labels',
            'https://www.googleapis.com/auth/gmail.metadata',
            'https://www.googleapis.com/auth/gmail.modify',
            'https://www.googleapis.com/auth/gmail.readonly',
            'https://www.googleapis.com/auth/gmail.send',
            'https://www.googleapis.com/auth/gmail.settings.basic',
            'https://www.googleapis.com/auth/gmail.settings.sharing',
        ].join(" ")
    }

    const qs = new URLSearchParams(options)

    return `${rootURL}?${qs.toString()}`
}


export default googleSignIn