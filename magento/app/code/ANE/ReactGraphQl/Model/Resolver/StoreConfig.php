<?php

declare(strict_types=1);

namespace ANE\ReactGraphQl\Model\Resolver;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Exception\GraphQlInputException;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\Store\Model\ScopeInterface;

class StoreConfig implements ResolverInterface
{
    public function __construct(
        private readonly ScopeConfigInterface $scopeConfig
    ) {
    }

    /**
     * @param array<string, mixed>|null $value
     * @param array<string, mixed>|null $args
     * @return array<string, string|null>
     */
    public function resolve(
        Field $field,
        $context,
        ResolveInfo $info,
        ?array $value = null,
        ?array $args = null
    ): array {
        if ($context === null) {
            throw new GraphQlInputException(__('GraphQL context is required.'));
        }

        return [
            'base_url' => $this->scopeConfig->getValue('web/unsecure/base_url', ScopeInterface::SCOPE_STORE),
            'secure_base_url' => $this->scopeConfig->getValue('web/secure/base_url', ScopeInterface::SCOPE_STORE),
            'store_name' => $this->scopeConfig->getValue('general/store_information/name', ScopeInterface::SCOPE_STORE),
            'locale' => $this->scopeConfig->getValue('general/locale/code', ScopeInterface::SCOPE_STORE),
            'default_currency' => $this->scopeConfig->getValue('currency/options/default', ScopeInterface::SCOPE_STORE),
        ];
    }
}
