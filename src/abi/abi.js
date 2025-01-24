export const contractAbi = [
    {
      type: "impl",
      name: "EventsImpl",
      interface_name: "chainevents_contracts::interfaces::IEvent::IEvent",
    },
    {
      type: "struct",
      name: "core::byte_array::ByteArray",
      members: [
        {
          name: "data",
          type: "core::array::Array::<core::bytes_31::bytes31>",
        },
        {
          name: "pending_word",
          type: "core::felt252",
        },
        {
          name: "pending_word_len",
          type: "core::integer::u32",
        },
      ],
    },
    {
      type: "struct",
      name: "core::integer::u256",
      members: [
        {
          name: "low",
          type: "core::integer::u128",
        },
        {
          name: "high",
          type: "core::integer::u128",
        },
      ],
    },
    {
      type: "enum",
      name: "chainevents_contracts::base::types::EventType",
      variants: [
        {
          name: "Free",
          type: "()",
        },
        {
          name: "Paid",
          type: "()",
        },
      ],
    },
    {
      type: "enum",
      name: "core::bool",
      variants: [
        {
          name: "False",
          type: "()",
        },
        {
          name: "True",
          type: "()",
        },
      ],
    },
    {
      type: "struct",
      name: "chainevents_contracts::base::types::EventDetails",
      members: [
        {
          name: "event_id",
          type: "core::integer::u256",
        },
        {
          name: "name",
          type: "core::byte_array::ByteArray",
        },
        {
          name: "location",
          type: "core::byte_array::ByteArray",
        },
        {
          name: "organizer",
          type: "core::starknet::contract_address::ContractAddress",
        },
        {
          name: "total_register",
          type: "core::integer::u256",
        },
        {
          name: "total_attendees",
          type: "core::integer::u256",
        },
        {
          name: "event_type",
          type: "chainevents_contracts::base::types::EventType",
        },
        {
          name: "is_closed",
          type: "core::bool",
        },
        {
          name: "paid_amount",
          type: "core::integer::u256",
        },
      ],
    },
    {
      type: "struct",
      name: "chainevents_contracts::base::types::EventRegistration",
      members: [
        {
          name: "attendee_address",
          type: "core::starknet::contract_address::ContractAddress",
        },
        {
          name: "amount_paid",
          type: "core::integer::u256",
        },
        {
          name: "has_rsvp",
          type: "core::bool",
        },
        {
          name: "nft_contract_address",
          type: "core::starknet::contract_address::ContractAddress",
        },
        {
          name: "nft_token_id",
          type: "core::integer::u256",
        },
        {
          name: "organizer",
          type: "core::starknet::contract_address::ContractAddress",
        },
      ],
    },
    {
      type: "interface",
      name: "chainevents_contracts::interfaces::IEvent::IEvent",
      items: [
        {
          type: "function",
          name: "add_event",
          inputs: [
            {
              name: "name",
              type: "core::byte_array::ByteArray",
            },
            {
              name: "location",
              type: "core::byte_array::ByteArray",
            },
          ],
          outputs: [
            {
              type: "core::integer::u256",
            },
          ],
          state_mutability: "external",
        },
        {
          type: "function",
          name: "register_for_event",
          inputs: [
            {
              name: "event_id",
              type: "core::integer::u256",
            },
          ],
          outputs: [],
          state_mutability: "external",
        },
        {
          type: "function",
          name: "end_event_registration",
          inputs: [
            {
              name: "event_id",
              type: "core::integer::u256",
            },
          ],
          outputs: [],
          state_mutability: "external",
        },
        {
          type: "function",
          name: "rsvp_for_event",
          inputs: [
            {
              name: "event_id",
              type: "core::integer::u256",
            },
          ],
          outputs: [],
          state_mutability: "external",
        },
        {
          type: "function",
          name: "upgrade_event",
          inputs: [
            {
              name: "event_id",
              type: "core::integer::u256",
            },
            {
              name: "paid_amount",
              type: "core::integer::u256",
            },
          ],
          outputs: [],
          state_mutability: "external",
        },
        {
          type: "function",
          name: "unregister_from_event",
          inputs: [
            {
              name: "event_id",
              type: "core::integer::u256",
            },
          ],
          outputs: [],
          state_mutability: "external",
        },
        {
          type: "function",
          name: "event_details",
          inputs: [
            {
              name: "event_id",
              type: "core::integer::u256",
            },
          ],
          outputs: [
            {
              type: "chainevents_contracts::base::types::EventDetails",
            },
          ],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "event_owner",
          inputs: [
            {
              name: "event_id",
              type: "core::integer::u256",
            },
          ],
          outputs: [
            {
              type: "core::starknet::contract_address::ContractAddress",
            },
          ],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "attendee_event_details",
          inputs: [
            {
              name: "event_id",
              type: "core::integer::u256",
            },
          ],
          outputs: [
            {
              type: "chainevents_contracts::base::types::EventRegistration",
            },
          ],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "attendees_registered",
          inputs: [
            {
              name: "event_id",
              type: "core::integer::u256",
            },
          ],
          outputs: [
            {
              type: "core::integer::u256",
            },
          ],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "event_registration_count",
          inputs: [
            {
              name: "event_id",
              type: "core::integer::u256",
            },
          ],
          outputs: [
            {
              type: "core::integer::u256",
            },
          ],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "upgrade",
          inputs: [
            {
              name: "new_class_hash",
              type: "core::starknet::class_hash::ClassHash",
            },
          ],
          outputs: [],
          state_mutability: "external",
        },
      ],
    },
    {
      type: "impl",
      name: "OwnableImpl",
      interface_name: "openzeppelin_access::ownable::interface::IOwnable",
    },
    {
      type: "interface",
      name: "openzeppelin_access::ownable::interface::IOwnable",
      items: [
        {
          type: "function",
          name: "owner",
          inputs: [],
          outputs: [
            {
              type: "core::starknet::contract_address::ContractAddress",
            },
          ],
          state_mutability: "view",
        },
        {
          type: "function",
          name: "transfer_ownership",
          inputs: [
            {
              name: "new_owner",
              type: "core::starknet::contract_address::ContractAddress",
            },
          ],
          outputs: [],
          state_mutability: "external",
        },
        {
          type: "function",
          name: "renounce_ownership",
          inputs: [],
          outputs: [],
          state_mutability: "external",
        },
      ],
    },
    {
      type: "constructor",
      name: "constructor",
      inputs: [],
    },
    {
      type: "event",
      name: "chainevents_contracts::events::events::Events::NewEventAdded",
      kind: "struct",
      members: [
        {
          name: "name",
          type: "core::byte_array::ByteArray",
          kind: "data",
        },
        {
          name: "event_id",
          type: "core::integer::u256",
          kind: "data",
        },
        {
          name: "location",
          type: "core::byte_array::ByteArray",
          kind: "data",
        },
        {
          name: "event_owner",
          type: "core::starknet::contract_address::ContractAddress",
          kind: "data",
        },
      ],
    },
    {
      type: "event",
      name: "chainevents_contracts::events::events::Events::RegisteredForEvent",
      kind: "struct",
      members: [
        {
          name: "event_id",
          type: "core::integer::u256",
          kind: "data",
        },
        {
          name: "event_name",
          type: "core::byte_array::ByteArray",
          kind: "data",
        },
        {
          name: "user_address",
          type: "core::starknet::contract_address::ContractAddress",
          kind: "data",
        },
      ],
    },
    {
      type: "event",
      name: "chainevents_contracts::events::events::Events::EventAttendanceMark",
      kind: "struct",
      members: [
        {
          name: "event_id",
          type: "core::integer::u256",
          kind: "data",
        },
        {
          name: "user_address",
          type: "core::starknet::contract_address::ContractAddress",
          kind: "data",
        },
      ],
    },
    {
      type: "event",
      name: "chainevents_contracts::events::events::Events::UpgradedEvent",
      kind: "struct",
      members: [
        {
          name: "event_id",
          type: "core::integer::u256",
          kind: "data",
        },
        {
          name: "event_name",
          type: "core::byte_array::ByteArray",
          kind: "data",
        },
        {
          name: "paid_amount",
          type: "core::integer::u256",
          kind: "data",
        },
        {
          name: "event_type",
          type: "chainevents_contracts::base::types::EventType",
          kind: "data",
        },
      ],
    },
    {
      type: "event",
      name: "chainevents_contracts::events::events::Events::EndEventRegistration",
      kind: "struct",
      members: [
        {
          name: "event_id",
          type: "core::integer::u256",
          kind: "data",
        },
        {
          name: "event_name",
          type: "core::byte_array::ByteArray",
          kind: "data",
        },
        {
          name: "event_owner",
          type: "core::starknet::contract_address::ContractAddress",
          kind: "data",
        },
      ],
    },
    {
      type: "event",
      name: "chainevents_contracts::events::events::Events::RSVPForEvent",
      kind: "struct",
      members: [
        {
          name: "event_id",
          type: "core::integer::u256",
          kind: "data",
        },
        {
          name: "attendee_address",
          type: "core::starknet::contract_address::ContractAddress",
          kind: "data",
        },
      ],
    },
    {
      type: "event",
      name: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
      kind: "struct",
      members: [
        {
          name: "previous_owner",
          type: "core::starknet::contract_address::ContractAddress",
          kind: "key",
        },
        {
          name: "new_owner",
          type: "core::starknet::contract_address::ContractAddress",
          kind: "key",
        },
      ],
    },
    {
      type: "event",
      name: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
      kind: "struct",
      members: [
        {
          name: "previous_owner",
          type: "core::starknet::contract_address::ContractAddress",
          kind: "key",
        },
        {
          name: "new_owner",
          type: "core::starknet::contract_address::ContractAddress",
          kind: "key",
        },
      ],
    },
    {
      type: "event",
      name: "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
      kind: "enum",
      variants: [
        {
          name: "OwnershipTransferred",
          type: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
          kind: "nested",
        },
        {
          name: "OwnershipTransferStarted",
          type: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
          kind: "nested",
        },
      ],
    },
    {
      type: "event",
      name: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded",
      kind: "struct",
      members: [
        {
          name: "class_hash",
          type: "core::starknet::class_hash::ClassHash",
          kind: "data",
        },
      ],
    },
    {
      type: "event",
      name: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event",
      kind: "enum",
      variants: [
        {
          name: "Upgraded",
          type: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Upgraded",
          kind: "nested",
        },
      ],
    },
    {
      type: "event",
      name: "chainevents_contracts::events::events::Events::UnregisteredEvent",
      kind: "struct",
      members: [
        {
          name: "event_id",
          type: "core::integer::u256",
          kind: "data",
        },
        {
          name: "user_address",
          type: "core::starknet::contract_address::ContractAddress",
          kind: "data",
        },
      ],
    },
    {
      type: "event",
      name: "chainevents_contracts::events::events::Events::Event",
      kind: "enum",
      variants: [
        {
          name: "NewEventAdded",
          type: "chainevents_contracts::events::events::Events::NewEventAdded",
          kind: "nested",
        },
        {
          name: "RegisteredForEvent",
          type: "chainevents_contracts::events::events::Events::RegisteredForEvent",
          kind: "nested",
        },
        {
          name: "EventAttendanceMark",
          type: "chainevents_contracts::events::events::Events::EventAttendanceMark",
          kind: "nested",
        },
        {
          name: "UpgradedEvent",
          type: "chainevents_contracts::events::events::Events::UpgradedEvent",
          kind: "nested",
        },
        {
          name: "EndEventRegistration",
          type: "chainevents_contracts::events::events::Events::EndEventRegistration",
          kind: "nested",
        },
        {
          name: "RSVPForEvent",
          type: "chainevents_contracts::events::events::Events::RSVPForEvent",
          kind: "nested",
        },
        {
          name: "OwnableEvent",
          type: "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
          kind: "flat",
        },
        {
          name: "UpgradeableEvent",
          type: "openzeppelin_upgrades::upgradeable::UpgradeableComponent::Event",
          kind: "flat",
        },
        {
          name: "UnregisteredEvent",
          type: "chainevents_contracts::events::events::Events::UnregisteredEvent",
          kind: "nested",
        },
      ],
    },
  ];