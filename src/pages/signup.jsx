import { Helmet } from 'react-helmet-async';

import { SignUpView } from 'src/sections/signup';

// ----------------------------------------------------------------------

export default function SignUpPage() {

  return (
    <>
      <Helmet>
        <title> Sign Up | InventoTrack </title>
      </Helmet>

      <SignUpView />
    </>
  );
}
