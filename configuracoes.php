
<?php
// configuracoes.php - TydraPI Settings page
session_start();

// Mock user settings and preferences
$userSettings = [
    'profile' => [
        'name' => 'João Silva',
        'username' => 'joaosilva',
        'bio' => 'Desenvolvedor Full Stack | React, Node.js, TypeScript | Entusiasta de IA e Tecnologias Emergentes | São Paulo, Brasil',
        'email' => 'joao.silva@exemplo.com',
        'phone' => '+55 11 98765-4321'
    ],
    'notifications' => [
        'messages' => true,
        'matches' => true,
        'groups' => true,
        'mentions' => true,
        'email_notifications' => false,
        'push_notifications' => true
    ],
    'privacy' => [
        'profile_visibility' => 'all',
        'online_status' => true,
        'read_receipts' => true,
        'data_collection' => true,
        'chat_expiration' => '24h'
    ],
    'appearance' => [
        'theme' => 'dark',
        'font_size' => 'medium',
        'language' => 'pt-BR'
    ],
    'security' => [
        'two_factor' => false
    ]
];

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['save_profile'])) {
        // Process profile settings update
        // This is a mock - in a real app, you would update the database
        $_SESSION['settings_message'] = "Perfil atualizado com sucesso!";
    } elseif (isset($_POST['save_password'])) {
        // Process password update
        $_SESSION['settings_message'] = "Senha atualizada com sucesso!";
    } elseif (isset($_POST['save_notification_settings'])) {
        // Process notification settings update
        $_SESSION['settings_message'] = "Configurações de notificação atualizadas com sucesso!";
    } elseif (isset($_POST['save_privacy'])) {
        // Process privacy settings update
        $_SESSION['settings_message'] = "Configurações de privacidade atualizadas com sucesso!";
    } elseif (isset($_POST['save_appearance'])) {
        // Process appearance settings update
        $_SESSION['settings_message'] = "Preferências de aparência atualizadas com sucesso!";
    }
    
    // Redirect to prevent form resubmission
    header('Location: ' . $_SERVER['PHP_SELF'] . '?tab=' . $_GET['tab']);
    exit;
}

// Get active tab
$activeTab = isset($_GET['tab']) ? $_GET['tab'] : 'account';
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TydraPI - Configurações</title>
    <link rel="stylesheet" href="notifications-php.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
</head>
<body>
    <div class="tydrapi-container">
        <h1 class="text-2xl font-bold mb-6">Configurações</h1>
        
        <?php if (isset($_SESSION['settings_message'])): ?>
            <div class="notification-toast">
                <?php echo $_SESSION['settings_message']; ?>
                <?php unset($_SESSION['settings_message']); ?>
            </div>
        <?php endif; ?>
        
        <div class="flex flex-col md:flex-row gap-6">
            <!-- Sidebar Navigation -->
            <div class="w-full md:w-64">
                <div class="notification-tabs flex flex-col w-full h-auto bg-transparent space-y-1">
                    <a href="?tab=account" class="notification-tab justify-start w-full <?php echo $activeTab === 'account' ? 'active' : ''; ?>">
                        <i class="fa fa-user mr-2"></i> Conta
                    </a>
                    <a href="?tab=security" class="notification-tab justify-start w-full <?php echo $activeTab === 'security' ? 'active' : ''; ?>">
                        <i class="fa fa-lock mr-2"></i> Segurança
                    </a>
                    <a href="?tab=notifications" class="notification-tab justify-start w-full <?php echo $activeTab === 'notifications' ? 'active' : ''; ?>">
                        <i class="fa fa-bell mr-2"></i> Notificações
                    </a>
                    <a href="?tab=privacy" class="notification-tab justify-start w-full <?php echo $activeTab === 'privacy' ? 'active' : ''; ?>">
                        <i class="fa fa-eye mr-2"></i> Privacidade
                    </a>
                    <a href="?tab=appearance" class="notification-tab justify-start w-full <?php echo $activeTab === 'appearance' ? 'active' : ''; ?>">
                        <i class="fa fa-moon mr-2"></i> Aparência
                    </a>
                    
                    <hr class="my-2 bg-tydrapi-darkgray">
                    
                    <a href="#" class="notification-tab justify-start text-tydrapi-red w-full hover:bg-tydrapi-darkgray">
                        <i class="fa fa-sign-out-alt mr-2"></i> Sair
                    </a>
                </div>
            </div>
            
            <!-- Tab Content -->
            <div class="flex-1">
                <?php if ($activeTab === 'account'): ?>
                    <div class="notification-card">
                        <div class="mb-4">
                            <h2 class="text-xl font-semibold">Informações de Conta</h2>
                            <p class="text-tydrapi-gray">
                                Gerencie suas informações pessoais e de perfil
                            </p>
                        </div>
                        
                        <form method="post" class="space-y-6">
                            <div class="flex flex-col items-center md:flex-row md:items-start gap-4 mb-6">
                                <div class="relative">
                                    <div class="h-24 w-24 rounded-full overflow-hidden">
                                        <img src="https://i.pravatar.cc/150?img=68" alt="Foto de perfil" class="w-full h-full object-cover">
                                    </div>
                                    <button type="button" class="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-tydrapi-red hover:bg-tydrapi-darkred flex items-center justify-center">
                                        <i class="fa fa-upload text-sm"></i>
                                    </button>
                                </div>
                                <div class="flex-1">
                                    <h3 class="font-medium text-center md:text-left"><?php echo $userSettings['profile']['name']; ?></h3>
                                    <p class="text-sm text-tydrapi-gray text-center md:text-left">@<?php echo $userSettings['profile']['username']; ?></p>
                                    <p class="text-sm mt-2 text-center md:text-left"><?php echo $userSettings['profile']['bio']; ?></p>
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="space-y-2">
                                    <label for="name" class="block text-sm font-medium">Nome</label>
                                    <input 
                                        id="name" 
                                        name="name" 
                                        value="<?php echo $userSettings['profile']['name']; ?>" 
                                        class="tydrapi-input bg-tydrapi-black border-tydrapi-darkgray"
                                    >
                                </div>
                                <div class="space-y-2">
                                    <label for="username" class="block text-sm font-medium">Nome de usuário</label>
                                    <input 
                                        id="username" 
                                        name="username" 
                                        value="<?php echo $userSettings['profile']['username']; ?>" 
                                        class="tydrapi-input bg-tydrapi-black border-tydrapi-darkgray"
                                    >
                                </div>
                            </div>
                            
                            <div class="space-y-2">
                                <label for="bio" class="block text-sm font-medium">Biografia</label>
                                <textarea 
                                    id="bio" 
                                    name="bio" 
                                    rows="3"
                                    class="tydrapi-input bg-tydrapi-black border-tydrapi-darkgray resize-none"
                                ><?php echo $userSettings['profile']['bio']; ?></textarea>
                            </div>
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="space-y-2">
                                    <label for="email" class="block text-sm font-medium">Email</label>
                                    <input 
                                        id="email" 
                                        name="email" 
                                        type="email" 
                                        value="<?php echo $userSettings['profile']['email']; ?>" 
                                        class="tydrapi-input bg-tydrapi-black border-tydrapi-darkgray"
                                    >
                                </div>
                                <div class="space-y-2">
                                    <label for="phone" class="block text-sm font-medium">Telefone</label>
                                    <input 
                                        id="phone" 
                                        name="phone" 
                                        value="<?php echo $userSettings['profile']['phone']; ?>" 
                                        class="tydrapi-input bg-tydrapi-black border-tydrapi-darkgray"
                                    >
                                </div>
                            </div>
                            
                            <button 
                                type="submit" 
                                name="save_profile" 
                                class="tydrapi-button w-full md:w-auto"
                            >
                                Salvar alterações
                            </button>
                        </form>
                    </div>
                <?php elseif ($activeTab === 'security'): ?>
                    <div class="notification-card">
                        <div class="mb-4">
                            <h2 class="text-xl font-semibold">Segurança</h2>
                            <p class="text-tydrapi-gray">
                                Gerencie sua senha e configurações de segurança
                            </p>
                        </div>
                        
                        <div class="space-y-6">
                            <form method="post" class="space-y-4">
                                <h3 class="text-lg font-medium">Alterar senha</h3>
                                
                                <div class="space-y-2">
                                    <label for="current-password" class="block text-sm font-medium">Senha atual</label>
                                    <input 
                                        id="current-password" 
                                        name="current_password"
                                        type="password" 
                                        class="tydrapi-input bg-tydrapi-black border-tydrapi-darkgray"
                                    >
                                </div>
                                
                                <div class="space-y-2">
                                    <label for="new-password" class="block text-sm font-medium">Nova senha</label>
                                    <input 
                                        id="new-password" 
                                        name="new_password"
                                        type="password" 
                                        class="tydrapi-input bg-tydrapi-black border-tydrapi-darkgray"
                                    >
                                </div>
                                
                                <div class="space-y-2">
                                    <label for="confirm-password" class="block text-sm font-medium">Confirmar nova senha</label>
                                    <input 
                                        id="confirm-password" 
                                        name="confirm_password"
                                        type="password" 
                                        class="tydrapi-input bg-tydrapi-black border-tydrapi-darkgray"
                                    >
                                </div>
                                
                                <button 
                                    type="submit" 
                                    name="save_password" 
                                    class="tydrapi-button"
                                >
                                    Atualizar senha
                                </button>
                            </form>
                            
                            <hr class="my-4 bg-tydrapi-darkgray">
                            
                            <div class="space-y-4">
                                <h3 class="text-lg font-medium">Autenticação de dois fatores</h3>
                                <p class="text-sm text-tydrapi-gray">
                                    Adicione uma camada extra de segurança à sua conta com a autenticação de dois fatores.
                                </p>
                                
                                <div class="flex justify-between items-center">
                                    <label for="twofa" class="block text-sm font-medium">Ativar autenticação de dois fatores</label>
                                    <label class="switch">
                                        <input type="checkbox" id="twofa" <?php echo $userSettings['security']['two_factor'] ? 'checked' : ''; ?>>
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                            </div>
                            
                            <hr class="my-4 bg-tydrapi-darkgray">
                            
                            <div class="space-y-4">
                                <h3 class="text-lg font-medium">Sessões ativas</h3>
                                <p class="text-sm text-tydrapi-gray">
                                    Dispositivos onde você está conectado atualmente.
                                </p>
                                
                                <div class="space-y-3">
                                    <div class="flex justify-between items-center p-3 border border-tydrapi-darkgray rounded-lg">
                                        <div>
                                            <h4 class="font-medium">Chrome - Windows</h4>
                                            <p class="text-xs text-tydrapi-gray">São Paulo, Brasil • Ativo agora</p>
                                        </div>
                                        <span class="notification-badge bg-green-600">Atual</span>
                                    </div>
                                    
                                    <div class="flex justify-between items-center p-3 border border-tydrapi-darkgray rounded-lg">
                                        <div>
                                            <h4 class="font-medium">Safari - iPhone</h4>
                                            <p class="text-xs text-tydrapi-gray">São Paulo, Brasil • Há 2 horas</p>
                                        </div>
                                        <button type="button" class="tydrapi-button-outline text-red-500 hover:bg-red-500 hover:text-white">
                                            Encerrar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php elseif ($activeTab === 'notifications'): ?>
                    <div class="notification-card">
                        <div class="mb-4">
                            <h2 class="text-xl font-semibold">Notificações</h2>
                            <p class="text-tydrapi-gray">
                                Gerencie como você recebe notificações
                            </p>
                        </div>
                        
                        <form method="post" class="space-y-6">
                            <div class="space-y-4">
                                <h3 class="text-lg font-medium">Notificações push</h3>
                                
                                <div class="space-y-3">
                                    <div class="flex justify-between items-center">
                                        <label for="notify-messages" class="block text-sm font-medium">Mensagens</label>
                                        <label class="switch">
                                            <input 
                                                type="checkbox" 
                                                id="notify-messages" 
                                                name="notifications[messages]" 
                                                <?php echo $userSettings['notifications']['messages'] ? 'checked' : ''; ?>
                                            >
                                            <span class="slider round"></span>
                                        </label>
                                    </div>
                                    
                                    <div class="flex justify-between items-center">
                                        <label for="notify-matches" class="block text-sm font-medium">Novos matches</label>
                                        <label class="switch">
                                            <input 
                                                type="checkbox" 
                                                id="notify-matches" 
                                                name="notifications[matches]" 
                                                <?php echo $userSettings['notifications']['matches'] ? 'checked' : ''; ?>
                                            >
                                            <span class="slider round"></span>
                                        </label>
                                    </div>
                                    
                                    <div class="flex justify-between items-center">
                                        <label for="notify-groups" class="block text-sm font-medium">Atividade em grupos</label>
                                        <label class="switch">
                                            <input 
                                                type="checkbox" 
                                                id="notify-groups" 
                                                name="notifications[groups]" 
                                                <?php echo $userSettings['notifications']['groups'] ? 'checked' : ''; ?>
                                            >
                                            <span class="slider round"></span>
                                        </label>
                                    </div>
                                    
                                    <div class="flex justify-between items-center">
                                        <label for="notify-mentions" class="block text-sm font-medium">Menções</label>
                                        <label class="switch">
                                            <input 
                                                type="checkbox" 
                                                id="notify-mentions" 
                                                name="notifications[mentions]" 
                                                <?php echo $userSettings['notifications']['mentions'] ? 'checked' : ''; ?>
                                            >
                                            <span class="slider round"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            <hr class="my-4 bg-tydrapi-darkgray">
                            
                            <div class="space-y-4">
                                <h3 class="text-lg font-medium">Métodos de notificação</h3>
                                
                                <div class="space-y-3">
                                    <div class="flex justify-between items-center">
                                        <div>
                                            <label for="notify-email" class="block text-sm font-medium">Notificações por email</label>
                                            <p class="text-xs text-tydrapi-gray">Receba resumos e atualizações importantes por email</p>
                                        </div>
                                        <label class="switch">
                                            <input 
                                                type="checkbox" 
                                                id="notify-email" 
                                                name="notifications[email_notifications]" 
                                                <?php echo $userSettings['notifications']['email_notifications'] ? 'checked' : ''; ?>
                                            >
                                            <span class="slider round"></span>
                                        </label>
                                    </div>
                                    
                                    <div class="flex justify-between items-center">
                                        <div>
                                            <label for="notify-push" class="block text-sm font-medium">Notificações push</label>
                                            <p class="text-xs text-tydrapi-gray">Receba notificações em tempo real no seu dispositivo</p>
                                        </div>
                                        <label class="switch">
                                            <input 
                                                type="checkbox" 
                                                id="notify-push" 
                                                name="notifications[push_notifications]" 
                                                <?php echo $userSettings['notifications']['push_notifications'] ? 'checked' : ''; ?>
                                            >
                                            <span class="slider round"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            <button type="submit" name="save_notification_settings" class="tydrapi-button">
                                Salvar preferências
                            </button>
                        </form>
                    </div>
                <?php elseif ($activeTab === 'privacy'): ?>
                    <div class="notification-card">
                        <div class="mb-4">
                            <h2 class="text-xl font-semibold">Privacidade</h2>
                            <p class="text-tydrapi-gray">
                                Gerencie quem pode ver seu perfil e como seus dados são usados
                            </p>
                        </div>
                        
                        <form method="post" class="space-y-6">
                            <div class="space-y-4">
                                <h3 class="text-lg font-medium">Visibilidade do perfil</h3>
                                
                                <div class="space-y-2">
                                    <label for="profile-visibility" class="block text-sm font-medium">Quem pode ver meu perfil</label>
                                    <select 
                                        id="profile-visibility" 
                                        name="privacy[profile_visibility]" 
                                        class="tydrapi-input bg-tydrapi-black border-tydrapi-darkgray"
                                    >
                                        <option value="all" <?php echo $userSettings['privacy']['profile_visibility'] == 'all' ? 'selected' : ''; ?>>Todos</option>
                                        <option value="connections" <?php echo $userSettings['privacy']['profile_visibility'] == 'connections' ? 'selected' : ''; ?>>Apenas conexões</option>
                                        <option value="nobody" <?php echo $userSettings['privacy']['profile_visibility'] == 'nobody' ? 'selected' : ''; ?>>Ninguém</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="space-y-3">
                                <div class="flex justify-between items-center">
                                    <div>
                                        <label for="online-status" class="block text-sm font-medium">Mostrar status online</label>
                                        <p class="text-xs text-tydrapi-gray">Permite que outros usuários vejam quando você está online</p>
                                    </div>
                                    <label class="switch">
                                        <input 
                                            type="checkbox" 
                                            id="online-status" 
                                            name="privacy[online_status]" 
                                            <?php echo $userSettings['privacy']['online_status'] ? 'checked' : ''; ?>
                                        >
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                                
                                <div class="flex justify-between items-center">
                                    <div>
                                        <label for="read-receipts" class="block text-sm font-medium">Confirmações de leitura</label>
                                        <p class="text-xs text-tydrapi-gray">Permite que outros usuários vejam quando você leu suas mensagens</p>
                                    </div>
                                    <label class="switch">
                                        <input 
                                            type="checkbox" 
                                            id="read-receipts" 
                                            name="privacy[read_receipts]" 
                                            <?php echo $userSettings['privacy']['read_receipts'] ? 'checked' : ''; ?>
                                        >
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                            </div>
                            
                            <hr class="my-4 bg-tydrapi-darkgray">
                            
                            <div class="space-y-4">
                                <h3 class="text-lg font-medium">Configurações de chat</h3>
                                
                                <div class="space-y-2">
                                    <label for="chat-expiration" class="block text-sm font-medium">Expiração de chats temporários</label>
                                    <select 
                                        id="chat-expiration" 
                                        name="privacy[chat_expiration]" 
                                        class="tydrapi-input bg-tydrapi-black border-tydrapi-darkgray"
                                    >
                                        <option value="12h" <?php echo $userSettings['privacy']['chat_expiration'] == '12h' ? 'selected' : ''; ?>>12 horas</option>
                                        <option value="24h" <?php echo $userSettings['privacy']['chat_expiration'] == '24h' ? 'selected' : ''; ?>>24 horas</option>
                                        <option value="48h" <?php echo $userSettings['privacy']['chat_expiration'] == '48h' ? 'selected' : ''; ?>>48 horas</option>
                                        <option value="never" <?php echo $userSettings['privacy']['chat_expiration'] == 'never' ? 'selected' : ''; ?>>Nunca expirar</option>
                                    </select>
                                </div>
                            </div>
                            
                            <hr class="my-4 bg-tydrapi-darkgray">
                            
                            <div class="space-y-3">
                                <h3 class="text-lg font-medium">Dados e permissões</h3>
                                
                                <div class="flex justify-between items-center">
                                    <div>
                                        <label for="data-collection" class="block text-sm font-medium">Coleta de dados para melhorias</label>
                                        <p class="text-xs text-tydrapi-gray">Permite a coleta de dados de uso para melhorar a experiência</p>
                                    </div>
                                    <label class="switch">
                                        <input 
                                            type="checkbox" 
                                            id="data-collection" 
                                            name="privacy[data_collection]" 
                                            <?php echo $userSettings['privacy']['data_collection'] ? 'checked' : ''; ?>
                                        >
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                                
                                <button type="button" class="tydrapi-button-outline w-full mt-2 border-tydrapi-gray text-tydrapi-gray hover:bg-tydrapi-darkgray">
                                    <i class="fa fa-shield-alt mr-2"></i> Solicitar download dos meus dados
                                </button>
                            </div>
                            
                            <button type="submit" name="save_privacy" class="tydrapi-button">
                                Salvar configurações
                            </button>
                        </form>
                    </div>
                <?php elseif ($activeTab === 'appearance'): ?>
                    <div class="notification-card">
                        <div class="mb-4">
                            <h2 class="text-xl font-semibold">Aparência</h2>
                            <p class="text-tydrapi-gray">
                                Personalize a aparência e a experiência da aplicação
                            </p>
                        </div>
                        
                        <form method="post" class="space-y-6">
                            <div class="space-y-4">
                                <h3 class="text-lg font-medium">Tema</h3>
                                
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="border rounded-lg p-4 flex items-center justify-center cursor-pointer border-<?php echo $userSettings['appearance']['theme'] === 'light' ? 'tydrapi-red bg-tydrapi-darkgray' : 'tydrapi-darkgray hover:border-tydrapi-gray'; ?>">
                                        <label for="theme-light" class="cursor-pointer flex flex-col items-center">
                                            <i class="fa fa-sun mb-2"></i>
                                            <span>Claro</span>
                                            <input 
                                                type="radio" 
                                                id="theme-light" 
                                                name="appearance[theme]" 
                                                value="light" 
                                                class="hidden" 
                                                <?php echo $userSettings['appearance']['theme'] === 'light' ? 'checked' : ''; ?>
                                            >
                                        </label>
                                    </div>
                                    
                                    <div class="border rounded-lg p-4 flex items-center justify-center cursor-pointer border-<?php echo $userSettings['appearance']['theme'] === 'dark' ? 'tydrapi-red bg-tydrapi-darkgray' : 'tydrapi-darkgray hover:border-tydrapi-gray'; ?>">
                                        <label for="theme-dark" class="cursor-pointer flex flex-col items-center">
                                            <i class="fa fa-moon mb-2"></i>
                                            <span>Escuro</span>
                                            <input 
                                                type="radio" 
                                                id="theme-dark" 
                                                name="appearance[theme]" 
                                                value="dark" 
                                                class="hidden" 
                                                <?php echo $userSettings['appearance']['theme'] === 'dark' ? 'checked' : ''; ?>
                                            >
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="space-y-4">
                                <h3 class="text-lg font-medium">Configurações de texto</h3>
                                
                                <div class="space-y-2">
                                    <label for="font-size" class="block text-sm font-medium">Tamanho da fonte</label>
                                    <select 
                                        id="font-size" 
                                        name="appearance[font_size]" 
                                        class="tydrapi-input bg-tydrapi-black border-tydrapi-darkgray"
                                    >
                                        <option value="small" <?php echo $userSettings['appearance']['font_size'] === 'small' ? 'selected' : ''; ?>>Pequeno</option>
                                        <option value="medium" <?php echo $userSettings['appearance']['font_size'] === 'medium' ? 'selected' : ''; ?>>Médio</option>
                                        <option value="large" <?php echo $userSettings['appearance']['font_size'] === 'large' ? 'selected' : ''; ?>>Grande</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="space-y-4">
                                <h3 class="text-lg font-medium">Idioma</h3>
                                
                                <div class="space-y-2">
                                    <label for="language" class="block text-sm font-medium">Idioma da aplicação</label>
                                    <select 
                                        id="language" 
                                        name="appearance[language]" 
                                        class="tydrapi-input bg-tydrapi-black border-tydrapi-darkgray"
                                    >
                                        <option value="pt-BR" <?php echo $userSettings['appearance']['language'] === 'pt-BR' ? 'selected' : ''; ?>>Português (Brasil)</option>
                                        <option value="en-US" <?php echo $userSettings['appearance']['language'] === 'en-US' ? 'selected' : ''; ?>>English (US)</option>
                                        <option value="es" <?php echo $userSettings['appearance']['language'] === 'es' ? 'selected' : ''; ?>>Español</option>
                                    </select>
                                </div>
                            </div>
                            
                            <button type="submit" name="save_appearance" class="tydrapi-button">
                                Salvar preferências
                            </button>
                        </form>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <script>
        // Toast notification script
        document.addEventListener('DOMContentLoaded', function() {
            const toast = document.querySelector('.notification-toast');
            if (toast) {
                setTimeout(function() {
                    toast.style.opacity = '0';
                    toast.style.transition = 'opacity 0.5s ease';
                    setTimeout(function() {
                        toast.remove();
                    }, 500);
                }, 3000);
            }
            
            // Theme selection
            const themeOptions = document.querySelectorAll('[name="appearance[theme]"]');
            themeOptions.forEach(function(option) {
                option.addEventListener('change', function() {
                    const themeContainers = document.querySelectorAll('.border.rounded-lg.p-4');
                    themeContainers.forEach(function(container) {
                        container.classList.remove('border-tydrapi-red', 'bg-tydrapi-darkgray');
                        container.classList.add('border-tydrapi-darkgray', 'hover:border-tydrapi-gray');
                    });
                    
                    if (this.checked) {
                        const selectedContainer = this.closest('.border.rounded-lg.p-4');
                        selectedContainer.classList.remove('border-tydrapi-darkgray', 'hover:border-tydrapi-gray');
                        selectedContainer.classList.add('border-tydrapi-red', 'bg-tydrapi-darkgray');
                    }
                });
            });
        });
    </script>
</body>
</html>
