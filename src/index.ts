import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { DatabaseProvider } from './providers/DatabaseProvider.js';
import { ClientRepository } from './repositories/ClientRepository.js';
import { ClientService } from './services/ClientService.js';

import { CryptoProvider } from './providers/CryptoProvider.js';
import { SecretService } from './services/SecretService.js';

import { BcryptHashProvider } from './providers/BcryptHashProvider.js';

async function main() {
  // Dependency Injection
  const db = DatabaseProvider.getInstance();
  const clientRepository = new ClientRepository(db);

  const cryptoProvider = new CryptoProvider();
  const hashProvider = new BcryptHashProvider();
  const secretService = new SecretService(cryptoProvider, hashProvider);
  
  const clientService = new ClientService(clientRepository, secretService);

  // CLI Interaction
  const rl = createInterface({ input, output });

  try {
    console.log('\n--- Client Secret Hash Manager ---');
    console.log('1. Create New Client');
    console.log('2. Login');
    
    const option = await rl.question('Select an option: ');

    if (option === '1') {
        const name = await rl.question('Enter client name to create: ');
        await clientService.createClient(name);
    } else if (option === '2') {
        const clientId = await rl.question('Client ID: ');
        const clientSecret = await rl.question('Client Secret: ');
        
        console.log('Authenticating...');
        const isAuthenticated = await clientService.authenticate(clientId.trim(), clientSecret.trim());
        
        if (isAuthenticated) {
            console.log('✅ LOGIN SUCCESSFUL');
        } else {
            console.log('❌ INVALID CREDENTIALS');
        }
    } else {
        console.log('Invalid option selected.');
    }

  } catch (error) {
    console.error('Error executing flow:', error);
  } finally {
    rl.close();
    await db.close();
  }
}

main();
