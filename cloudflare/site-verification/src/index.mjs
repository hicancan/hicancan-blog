import verificationText from '../../../public/baidu_verify_codeva-TlJBZmli1p.html';
import { serveVerification } from './handler.mjs';

export default {
  fetch(request) {
    return serveVerification(request, verificationText);
  },
};
