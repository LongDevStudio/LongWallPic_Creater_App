enum SupportedDevice {
    None, // 0 -> 00000000
    Mobile, // 1 -> 00000010 -> 2
    Tablet, // 2 -> 00000100 -> 4
    Desktop, // 3 -> 00001000 -> 8
    TV, // 4 -> 00010000 -> 16
    VerticalDesktop, // 5 -> 00100000 -> 32
    Watch, // 6 -> 01000000 -> 64
    Vision, // 7 -> 10000000 -> 128
}

type PlatformEnumSet = Set<SupportedDevice>;

// Convert EnumSet to a binary representation (as a long value)
function value(choices: PlatformEnumSet): number {
    if (!choices || choices.size === 0) {
        return 0;
    }

    let result = 0;
    choices.forEach(choice => {
        result |= 1 << choice;
    });

    return result;
}

// Convert a binary value back to an EnumSet
function parse(value: number): PlatformEnumSet {
    const choices = new Set<SupportedDevice>();

    if (!value) {
        return choices;
    }

    for (const choice in SupportedDevice) {
        const enumValue = parseInt(choice);
        if (!isNaN(enumValue) && (value & (1 << enumValue)) !== 0) {
            choices.add(enumValue as SupportedDevice);
        }
    }

    return choices;
}

export type { SupportedDevice, PlatformEnumSet, value, parse };
