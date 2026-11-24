
## Virtualization
- VMware Workstation Pro
- Three Ubuntu virtual machines
- Private network: VMnet1 (192.168.91.0/24)

## Frontend VM
- Ubuntu Desktop
- Private IP: 192.168.91.10
- React + Vite
- Communicates with the Backend API

## Backend VM
- Ubuntu Server 24.04
- Private IP: 192.168.91.20
- Node.js 24 and npm 11
- Express and Mongoose dependencies installed
- SSH port: 22222
- UFW enabled
- API port 3000 permitted from Frontend VM

## Database VM
- Ubuntu Server 24.04
- Private IP: 192.168.91.30
- MongoDB Community Edition 8.0
- Authentication enabled
- MongoDB bound to localhost and 192.168.91.30
- SSH port: 22222
- UFW enabled

## Database Security
- Administrative account: bookshelfAdmin
- Application account: bookshelfApp
- Application permissions: readWrite on bookshelf database
- MongoDB port 27017 allowed only from 192.168.91.20
- SSH port 22222 allowed only from 192.168.91.20
- Default incoming firewall policy: deny

## Verified Tests
- Database VM can ping Backend VM
- Backend VM can SSH into Database VM
- Backend VM can reach MongoDB on port 27017
- Backend VM successfully authenticated with MongoDB using Mongoose and bookshelfApp

## Remaining Milestone 2 Tasks
- Implement Express backend API
- Implement account registration and login
- Hash passwords securely
- Connect React frontend to backend
- Verify system logs
- Perform security and integration testing

## Security Notes
Passwords, private SSH keys, environment files, and database contents must not be committed to GitHub.

### Frontend Firewall

- UFW enabled.
- Default incoming policy: deny.
- Default outgoing policy: allow.
- TCP port 5173 permitted from the Windows host (192.168.91.1) through ens37.
- Internet access maintained through the NAT adapter.
- Direct access to the database is restricted by the database firewall.

### Backend Firewall

- TCP port 3000 permitted from the Frontend VM.
- TCP port 22222 permitted from the Frontend VM.
- All other unsolicited incoming connections denied.
- No default internet gateway.

### Database Firewall

- TCP port 27017 permitted from the Backend VM.
- TCP port 22222 permitted from the Backend VM.
- Direct connections from the Frontend VM are blocked.
- MongoDB authentication is enabled.
- No default internet gateway.

### Authentication and Application Security

- Passwords are hashed using bcrypt.
- JWTs are used for authentication.
- Authentication tokens are stored in HttpOnly cookies.
- SameSite cookie restrictions are enabled.
- Server-side input validation helps prevent NoSQL injection.
- Login and registration requests are rate limited.
- Helmet provides HTTP security headers for API responses.
- JSON request bodies are limited to 10 KB.
- Malformed JSON requests are rejected.
- Sensitive environment variables are excluded from Git.

### Backend Service Management

The Express backend is managed by systemd through bookshelf-backend.service.

The service provides:

- Automatic startup during system boot.
- Automatic restart following process failure.
- Execution under a non-root user.
- System-managed logging through journald.

### System Logging

Each VM maintains its own system logs.

- Frontend: Linux system logs and UFW firewall logs.
- Backend: Express service logs, SSH logs, and UFW firewall logs.
- Database: MongoDB service logs, MongoDB application logs, and UFW firewall logs.

### Current Deployment Limitations

The current deployment operates within a private VMware laboratory environment using HTTP. HTTPS and Secure authentication cookies are required before public deployment.

Rate limiting currently operates through the frontend proxy and may apply collectively to users accessing the backend through that proxy.

Email verification and additional application features are planned for a future update.
