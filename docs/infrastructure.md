
# BookShelf Infrastructure – Milestone 2

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
