
<?php
// configuracoes.php - Settings page with notifications tab
session_start();

// Mock user settings and preferences
$userSettings = [
    'notifications' => [
        'email' => true,
        'push' => true,
        'sms' => false
    ],
    'privacy' => [
        'profile_visibility' => 'public',
        'show_online_status' => true
    ],
    'appearance' => [
        'theme' => 'dark',
        'font_size' => 'medium'
    ]
];

// Mock notification preferences data
$notificationPreferences = [
    [
        'id' => 1,
        'type' => 'academic',
        'description' => 'Notificações de prazos acadêmicos',
        'enabled' => true
    ],
    [
        'id' => 2,
        'type' => 'academic',
        'description' => 'Notificações de novas atividades',
        'enabled' => true
    ],
    [
        'id' => 3,
        'type' => 'calendar',
        'description' => 'Lembretes de eventos',
        'enabled' => true
    ],
    [
        'id' => 4,
        'type' => 'materials',
        'description' => 'Novos materiais didáticos',
        'enabled' => false
    ],
    [
        'id' => 5,
        'type' => 'materials',
        'description' => 'Atualizações de materiais existentes',
        'enabled' => true
    ]
];

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['save_notification_settings'])) {
        // Process notification settings update
        foreach ($_POST as $key => $value) {
            if (strpos($key, 'notification_') === 0) {
                $notificationId = substr($key, 12);
                
                // In a real app, update database here
                // We're just sending a success message for demonstration
            }
        }
        
        // Set success message
        $_SESSION['settings_message'] = "Configurações de notificação atualizadas com sucesso!";
        
        // Redirect to prevent form resubmission
        header('Location: ' . $_SERVER['PHP_SELF'] . '?tab=notifications');
        exit;
    }
}

// Get active tab
$activeTab = isset($_GET['tab']) ? $_GET['tab'] : 'profile';

// Include header
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
        
        <!-- Settings Tabs -->
        <div class="notification-tabs">
            <a href="?tab=profile" class="notification-tab <?php echo $activeTab === 'profile' ? 'active' : ''; ?>">
                <i class="fa fa-user mr-2"></i> Perfil
            </a>
            <a href="?tab=notifications" class="notification-tab <?php echo $activeTab === 'notifications' ? 'active' : ''; ?>">
                <i class="fa fa-bell mr-2"></i> Notificações
            </a>
            <a href="?tab=privacy" class="notification-tab <?php echo $activeTab === 'privacy' ? 'active' : ''; ?>">
                <i class="fa fa-lock mr-2"></i> Privacidade
            </a>
            <a href="?tab=appearance" class="notification-tab <?php echo $activeTab === 'appearance' ? 'active' : ''; ?>">
                <i class="fa fa-palette mr-2"></i> Aparência
            </a>
        </div>
        
        <!-- Tab Content -->
        <?php if ($activeTab === 'profile'): ?>
            <div class="notification-card">
                <h2 class="text-xl font-semibold mb-4">Informações do Perfil</h2>
                <p class="text-tydrapi-gray mb-4">Gerencie suas informações pessoais e de contato.</p>
                
                <!-- Profile settings would go here -->
                <form class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-2">Nome completo</label>
                        <input type="text" value="João Silva" class="tydrapi-input w-full">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">Email</label>
                        <input type="email" value="joao.silva@exemplo.com" class="tydrapi-input w-full">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">Biografia</label>
                        <textarea class="tydrapi-input w-full h-24">Estudante de Ciência da Computação.</textarea>
                    </div>
                    
                    <button type="submit" class="tydrapi-button">Salvar alterações</button>
                </form>
            </div>
            
        <?php elseif ($activeTab === 'notifications'): ?>
            <div class="notification-card">
                <h2 class="text-xl font-semibold mb-4">Preferências de Notificações</h2>
                <p class="text-tydrapi-gray mb-4">Escolha quais notificações deseja receber e como deseja recebê-las.</p>
                
                <form method="post" class="space-y-6">
                    <div>
                        <h3 class="text-lg font-medium mb-3">Canais de notificação</h3>
                        <div class="flex items-center mb-3">
                            <input type="checkbox" id="email_notifications" name="email_notifications" <?php echo $userSettings['notifications']['email'] ? 'checked' : ''; ?> class="mr-2">
                            <label for="email_notifications" class="cursor-pointer">Notificações por email</label>
                        </div>
                        <div class="flex items-center mb-3">
                            <input type="checkbox" id="push_notifications" name="push_notifications" <?php echo $userSettings['notifications']['push'] ? 'checked' : ''; ?> class="mr-2">
                            <label for="push_notifications" class="cursor-pointer">Notificações push no navegador</label>
                        </div>
                        <div class="flex items-center">
                            <input type="checkbox" id="sms_notifications" name="sms_notifications" <?php echo $userSettings['notifications']['sms'] ? 'checked' : ''; ?> class="mr-2">
                            <label for="sms_notifications" class="cursor-pointer">Notificações por SMS</label>
                        </div>
                    </div>
                    
                    <div>
                        <h3 class="text-lg font-medium mb-3">Tipos de notificação</h3>
                        
                        <?php foreach ($notificationPreferences as $pref): ?>
                        <div class="notification-card <?php echo $pref['enabled'] ? 'unread' : ''; ?> mb-4">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <?php 
                                    $iconClass = 'notification-icon ';
                                    switch($pref['type']) {
                                        case 'academic': 
                                            $iconClass .= 'notification-icon-academic';
                                            $icon = 'fa-graduation-cap';
                                            break;
                                        case 'calendar': 
                                            $iconClass .= 'notification-icon-deadline'; 
                                            $icon = 'fa-calendar';
                                            break;
                                        case 'materials': 
                                            $iconClass .= 'notification-icon-homework';
                                            $icon = 'fa-book';
                                            break;
                                        default: 
                                            $iconClass .= 'notification-icon-event';
                                            $icon = 'fa-bell';
                                    }
                                    ?>
                                    <span class="<?php echo $iconClass; ?>">
                                        <i class="fa <?php echo $icon; ?>"></i>
                                    </span>
                                    <div class="ml-4">
                                        <span class="notification-title">
                                            <?php echo htmlspecialchars($pref['description']); ?>
                                        </span>
                                        <p class="notification-message">
                                            Tipo: <?php echo ucfirst($pref['type']); ?>
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <label class="switch">
                                        <input type="checkbox" name="notification_<?php echo $pref['id']; ?>" <?php echo $pref['enabled'] ? 'checked' : ''; ?>>
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <?php endforeach; ?>
                    </div>
                    
                    <div>
                        <h3 class="text-lg font-medium mb-3">Frequência de notificações</h3>
                        <div class="mb-4">
                            <select name="notification_frequency" class="tydrapi-input w-full">
                                <option value="real_time">Em tempo real</option>
                                <option value="daily">Resumo diário</option>
                                <option value="weekly">Resumo semanal</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="notification-actions">
                        <button type="submit" name="save_notification_settings" class="tydrapi-button">
                            <i class="fa fa-save mr-2"></i> Salvar preferências
                        </button>
                        <button type="reset" class="tydrapi-button-outline">
                            <i class="fa fa-undo mr-2"></i> Restaurar padrões
                        </button>
                    </div>
                </form>
            </div>
            
        <?php elseif ($activeTab === 'privacy'): ?>
            <div class="notification-card">
                <h2 class="text-xl font-semibold mb-4">Configurações de Privacidade</h2>
                <p class="text-tydrapi-gray mb-4">Controle quem pode ver seu perfil e informações.</p>
                
                <!-- Privacy settings would go here -->
                <form class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-2">Visibilidade do perfil</label>
                        <select class="tydrapi-input w-full">
                            <option <?php echo $userSettings['privacy']['profile_visibility'] == 'public' ? 'selected' : ''; ?>>Público</option>
                            <option <?php echo $userSettings['privacy']['profile_visibility'] == 'friends' ? 'selected' : ''; ?>>Apenas amigos</option>
                            <option <?php echo $userSettings['privacy']['profile_visibility'] == 'private' ? 'selected' : ''; ?>>Privado</option>
                        </select>
                    </div>
                    <div class="flex items-center">
                        <input type="checkbox" id="show_online" name="show_online" <?php echo $userSettings['privacy']['show_online_status'] ? 'checked' : ''; ?> class="mr-2">
                        <label for="show_online" class="cursor-pointer">Mostrar quando estou online</label>
                    </div>
                    
                    <button type="submit" class="tydrapi-button">Salvar alterações</button>
                </form>
            </div>
            
        <?php elseif ($activeTab === 'appearance'): ?>
            <div class="notification-card">
                <h2 class="text-xl font-semibold mb-4">Preferências de Aparência</h2>
                <p class="text-tydrapi-gray mb-4">Personalize a aparência do aplicativo.</p>
                
                <!-- Appearance settings would go here -->
                <form class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-2">Tema</label>
                        <div class="flex space-x-4">
                            <div class="theme-option <?php echo $userSettings['appearance']['theme'] == 'dark' ? 'selected' : ''; ?>">
                                <div class="theme-preview bg-tydrapi-black border border-tydrapi-darkgray rounded-md h-20 w-20 mb-2"></div>
                                <div class="flex items-center">
                                    <input type="radio" id="theme_dark" name="theme" value="dark" <?php echo $userSettings['appearance']['theme'] == 'dark' ? 'checked' : ''; ?> class="mr-2">
                                    <label for="theme_dark">Escuro</label>
                                </div>
                            </div>
                            <div class="theme-option <?php echo $userSettings['appearance']['theme'] == 'light' ? 'selected' : ''; ?>">
                                <div class="theme-preview bg-white border border-gray-300 rounded-md h-20 w-20 mb-2"></div>
                                <div class="flex items-center">
                                    <input type="radio" id="theme_light" name="theme" value="light" <?php echo $userSettings['appearance']['theme'] == 'light' ? 'checked' : ''; ?> class="mr-2">
                                    <label for="theme_light">Claro</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium mb-2">Tamanho da fonte</label>
                        <select class="tydrapi-input w-full">
                            <option <?php echo $userSettings['appearance']['font_size'] == 'small' ? 'selected' : ''; ?>>Pequeno</option>
                            <option <?php echo $userSettings['appearance']['font_size'] == 'medium' ? 'selected' : ''; ?>>Médio</option>
                            <option <?php echo $userSettings['appearance']['font_size'] == 'large' ? 'selected' : ''; ?>>Grande</option>
                        </select>
                    </div>
                    
                    <button type="submit" class="tydrapi-button">Salvar alterações</button>
                </form>
            </div>
        <?php endif; ?>
    </div>

    <script>
        // Simple script to handle toast notifications
        document.addEventListener('DOMContentLoaded', function() {
            const toast = document.querySelector('.notification-toast');
            if (toast) {
                setTimeout(function() {
                    toast.style.opacity = '0';
                    setTimeout(function() {
                        toast.remove();
                    }, 500);
                }, 3000);
            }
        });
    </script>
</body>
</html>
