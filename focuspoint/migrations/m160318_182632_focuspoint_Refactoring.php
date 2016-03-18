<?php
namespace Craft;

/**
 * The class name is the UTC timestamp in the format of mYYMMDD_HHMMSS_pluginHandle_migrationName
 */
class m160318_182632_focuspoint_Refactoring extends BaseMigration
{
	/**
	 * Any migration code in here is wrapped inside of a transaction.
	 *
	 * @return bool
	 */
	public function safeUp()
	{
		$this->renameColumn("focuspoint_focuspoints", "x", "focusX");
		$this->renameColumn("focuspoint_focuspoints", "y", "focusY");

		return true;
	}
}
